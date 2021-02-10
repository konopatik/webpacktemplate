const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
}


const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

module.exports = {
    externals: {
        paths: PATHS,
    },

    entry: {
        app: PATHS.src,
    },
    output: {
        filename: `${PATHS.assets}js/[name].[hash].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'vendors',
                    test: /node_modules/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: "pug-loader",
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: "/node_modules/",
            },
            {
                test: /\.(woff|woff2|ttf|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: '[name].[ext]'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true, postcssOptions: {
                                config: path.resolve(__dirname, `../postcss.config.js`),
                            },
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {sourceMap: true}
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true, postcssOptions: {
                                config: path.resolve(__dirname, `../postcss.config.js`),
                            },
                        }
                    },
                ],
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: `${PATHS.assets}css/[name].[fullhash].css`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img`,},
                {from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts`,},
                {from: `${PATHS.src}/static`, to: '',},
            ]
        }),
        ...PAGES.map((page => new HtmlWebpackPlugin({
            template: `${PAGES_DIR}/${page}`,
            filename: `./${page.replace(/\.pug/, '.html')}`
        }))),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],

}


// ["./src/main.pug", "./src/about.pug"]
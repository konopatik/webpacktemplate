const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const PATHS = {
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/',
}
const PAGES_DIR = `${PATHS.src}/pug/pages`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));




module.exports = {
    externals: {
        paths: PATHS,
    },

    entry:  PATHS.src,
    output: {
        filename: `${PATHS.assets}js/[name].[fullhash].js`,
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
                test: /\.(?:woff|woff2|ttf)$/,
                loader: "file-loader",
                options: {
                    name: './fonts/[name].[ext]'
                }
            },
            {
                test: /\.(?:|png|jpg|jpeg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: `./img/[name].[ext]`
                }
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            }
                        }
                    },
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                config: path.resolve(__dirname, '../postcss.config.js'),
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
                      MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {sourceMap: true}
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                config: path.resolve(__dirname, '../postcss.config.js'),
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
        new CleanWebpackPlugin(),
    ]

}


// ["./src/main.pug", "./src/about.pug"]
// const getFiles = (dir, fileType) => {
//     return dir.map(folder => {
//         const folderPath = `${PAGES_DIR}/${folder}`;
//         const folderFiles = fs.readdirSync(folderPath);
//         const pageFile = folderFiles.find(fileName => fileName.endsWith(`.${fileType}`));
//         return pageFile;
//     });
// }
//
// const PAGES_DIR = `${PATHS.src}/pug/pages`;
// const PAGES_FOLDER = fs.readdirSync(PAGES_DIR);
// const PAGES = getFiles(PAGES_FOLDER, 'pug');
// const ENTRY = getFiles(PAGES_FOLDER, 'js');
// const ENTRYS = {};
//
// ENTRY.forEach((entryFile, index) => {
//     const fileName = entryFile.split('.')[0];
//     ENTRYS[fileName] = `${PAGES_DIR}/${PAGES[index]}/${entryFile}`
// })
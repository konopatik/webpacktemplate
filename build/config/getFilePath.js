/* eslint-env node */

/**
 * @file: getFilePath.js для обхода файлового каталога
 * @author: leinov
 * @date: 2018-10-11
 */

const fs = require("fs");

/**
 * [Перейдите в каталог с файлом под файлом]
 *
 * @param {String} путь
 * @returns {Array} ["about","index"]
 */
module.exports = function getFilePath(path){
    let fileArr = [];
    let existpath = fs.existsSync (path); // Есть ли каталог
    if(existpath){
        let readdirSync = fs.readdirSync (path); // Получить все файлы в каталоге
        readdirSync.map((item)=>{
            let currentPath = path + "/" + item;
            let isDirector = fs.statSync (currentPath) .isDirectory (); // оцените, является ли это папкой
            if (isDirector && item !== "component") {// Компоненты в каталоге компонентов должны быть исключены
                fileArr.push(item);
            }
        });
        return fileArr;
    }
    console.log(fileArr)
};

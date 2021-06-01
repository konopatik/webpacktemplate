/* eslint-env node */
/**
 * @file: getEntry.js получить запись в файл
 * @author: leinov
 * @date: 2018-10-11
 * @update: 2018-11-04 Оптимизировать вызов метода ввода getFilePath
 */
const getFilePath = require("./getFilePath");
/**
 * [Получить запись в файл]
 *
 * @param {String} путь вводит корневой путь
 * @returns {Object} вернул запись {"about / aoubt": "./ src / about / about.js", ...}
 */
module.exports = function getEntry(path){
    let entry = {};
    getFilePath(path).map((item)=>{
        /**
         * Формат вывода ниже: {"about / about": "./ src / aobout / index.js"}
         * Это делается для упаковки js в соответствующую папку
         */
        entry[`${item}/${item}`] = `${path}/${item}/index.js`;

    });
    return entry;
};

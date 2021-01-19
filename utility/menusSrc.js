const fs = require('fs');

// public/images/menusディレクトリの全てのファイル名をもつ配列
const fileNames = fs.readdirSync('public/images/menus');

/**
 * 例:
 * iconsSrc = [
 *  'images/menus/1.jpg',
 *  'images/menus/2.jpg',
 *  'images/menus/3.jpg',
 *  'images/menus/4.jpg',
 * ]
 */
const menusSrc = fileNames.map((fileName) => `images/menus/${fileName}`);

module.exports = menusSrc;

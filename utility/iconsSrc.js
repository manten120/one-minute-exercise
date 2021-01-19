const fs = require('fs');

// public/images/iconsディレクトリの全てのファイル名をもつ配列
const fileNames = fs.readdirSync('public/images/icons');

/**
 * 例:
 * iconsSrc = [
 *  images/icons/boy1.js,
 *  images/icons/boy2.js,
 *  images/icons/girl1.js,
 *  images/icons/girl2.js,
 * ]
 */
const iconsSrc = fileNames.map((fileName) => `images/icons/${fileName}`);

module.exports = iconsSrc;

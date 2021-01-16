const fs = require('fs');

// public/images/stampsディレクトリの全てのファイル名をもつ配列
const fileNames = fs.readdirSync('public/images/stamps');

/**
 * 例:
 * iconsSrc = [
 *  'images/stamps/1.jpg',
 *  'images/stamps/2.jpg',
 *  'images/stamps/3.jpg',
 *  'images/stamps/4.jpg',
 * ]
 */
const stampsSrc = fileNames.map((fileName) => `images/stamps/${fileName}`);

module.exports = stampsSrc;

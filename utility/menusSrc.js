const fs = require('fs');

// public/images/menusディレクトリの全てのファイル名をもつ配列
const fileNames = fs.readdirSync('public/images/menus');

/**
 * 例:
 * menus = [
 *  'images/menus/1.jpg',
 *  'images/menus/2.jpg',
 *  'images/menus/3.jpg',
 *  'images/menus/4.jpg',
 * ]
 */
const menus = fileNames.map((fileName) => `images/menus/${fileName}`);

const getSomeItemsOfShuffledMenus = (numOfItems) => {
  const shuffleMenus = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  return shuffleMenus(menus).slice(0, numOfItems);
};

module.exports = getSomeItemsOfShuffledMenus;

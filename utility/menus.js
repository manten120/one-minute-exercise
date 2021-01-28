const fs = require('fs');

// public/images/menusディレクトリの全てのファイル名をもつ配列
const fileNames = fs.readdirSync('public/images/menus');

/**
 * 例:
 * menusKeyAndSrcPairs = [
 *  { key: 0, src: 'images/menus/hoge.jpg' },
 *  { key: 1, src: 'images/menus/foo.jpg' },
 *  { key: 2, src: 'images/menus/baa.jpg' },
 *  { key: 3, src: 'images/menus/guu.jpg' },
 * ]
 */
const menusKeyAndSrcPairs = fileNames.map((fileName, index) => ({
  key: index,
  src: `images/menus/${fileName}`,
}));

// 配列menusKeyAndSrcPairsからnumberOfItems個の要素をランダムで抽出した配列を作る
const getRandomMenusKeyAndSrcPairs = (numberOfItems) => {
  const shuffle = ([...array]) => {
    for (let i = array.length - 1; i >= 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      // eslint-disable-next-line no-param-reassign
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  return shuffle(menusKeyAndSrcPairs).slice(0, numberOfItems);
};

module.exports = { menusKeyAndSrcPairs, getRandomMenusKeyAndSrcPairs };

// このファイルは削除予定です

const texts = {
  おつかれさま: ['おつかれさまでした', 'つかれたぁ～', 'リフレッシュ'],
  激励: [
    '次の1時間も頑張ろう!',
    '今日も頑張ろう!',
    '明日も頑張ろう!',
    'ぼちぼちやっていきましょう～',
    '無理しないでね',
  ],
  感謝: ['ありがとう', 'いつもありがとう', 'さんきゅーぅ', 'マジ感謝'],
  挨拶: ['おはよう', 'こんにちは', 'こんばんは', '今日もよろしくです', 'また明日!'],
  ごはん: ['おなかすいた～', 'ごはん食べた？', '食べたよ', 'まだ～'],
};

const colors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

/**
 * arrayOfArrays = [
 *   [
 *     { text: 'おつかれさまでした', color: 'primary' },
 *     { text: 'つかれたぁ～', color: 'primary' },
 *     { text: 'リフレッシュ', color: 'primary' }
 *   ],
 *   [
 *     { text: '次の1時間も頑張ろう!', color: 'secondary' },
 *     { text: '今日も頑張ろう!', color: 'secondary' },
 *     { text: '明日も頑張ろう!', color: 'secondary' }
 *   ]
 * ];
 */
const arrayOfArrays = Object.keys(texts).map((key, indexOfKey) =>
  texts[key].map((text) => ({ text, color: colors[indexOfKey % colors.length] }))
);

/**
 * 例
 * textAndColorPairs = [
 *  { text: 'おつかれさまでした', color: 'primary' },
 *  { text: 'つかれたぁ～', color: 'primary' },
 *  { text: '次の時間も頑張ろう', color: 'secondary' },
 * ]
 */
const textAndColorPairs = [];
arrayOfArrays.forEach((array) => {
  array.forEach((textAndColorPair) => {
    textAndColorPairs.push(textAndColorPair);
  });
});

module.exports = { textAndColorPairs };

const categories = {
  tassei: '達成',
  gekirei: '激励',
  kansya: '感謝',
};

console.log(categories.tassei);

const textsData = {
  0: {
    category: categories.tassei,
    text: 'おつかれさまでした',
    response: {
      stamp: [],
      text: [],
    },
  },
  1: {
    category: '達成',
    text: 'つかれたぁ～',
    response: {
      stamp: [],
      text: [],
    },
  },
  2: {
    category: '達成',
    text: 'リフレッシュ',
    response: {
      stamp: [],
      text: [],
    },
  },
  4: {
    category: '激励',
    text: '次の1時間も頑張ろう',
    response: {
      stamp: [],
      text: [],
    },
  },
  5: {
    category: '激励',
    text: '明日も頑張ろう',
    response: {
      stamp: [],
      text: [],
    },
  },
  6: {
    category: '激励',
    text: 'ぼちぼちやっていきましょう～',
    response: {
      stamp: [],
      text: [],
    },
  },
  7: {
    category: '激励',
    text: '無理しないでね',
    response: {
      stamp: [],
      text: [],
    },
  },
  8: {
    category: '感謝',
    text: 'ありがとう',
    response: {
      stamp: [],
      text: [],
    },
  },
  9: {
    category: '感謝',
    text: 'いつもありがとう',
    response: {
      stamp: [],
      text: [],
    },
  },
};

console.log(textsData[0].category);

// const categories = ['達成', '激励', '感謝'];

// const btnColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

// const categorizedAndAddedBtnColor = {}
// const c = categories.map((category, index) => {

// });

const textsKeyAndTextPairs = Object.keys(textsData).map((key) => ({
  key,
  text: textsData[key].text,
}));

module.exports = {
  textsData,
  textsKeyAndTextPairs,
};

// {
//   key: {
//     text,
//     btcColor,
//   },
// }

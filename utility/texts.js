const categories = {
  tassei: '達成',
  gekirei: '激励',
  kansya: '感謝',
  aisatsu: '挨拶',
  gohan: '御飯',
};

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
    category: categories.tassei,
    text: 'つかれたぁ～',
    response: {
      stamp: [],
      text: [],
    },
  },
  2: {
    category: categories.tassei,
    text: 'リフレッシュ',
    response: {
      stamp: [],
      text: [],
    },
  },
  4: {
    category: categories.gekirei,
    text: '次の1時間も頑張ろう',
    response: {
      stamp: [],
      text: [],
    },
  },
  5: {
    category: categories.gekirei,
    text: '明日も頑張ろう',
    response: {
      stamp: [],
      text: [],
    },
  },
  6: {
    category: categories.gekirei,
    text: 'ぼちぼちやっていきましょう～',
    response: {
      stamp: [],
      text: [],
    },
  },
  7: {
    category: categories.gekirei,
    text: '無理しないでね',
    response: {
      stamp: [],
      text: [],
    },
  },
  8: {
    category: categories.kansya,
    text: 'ありがとう',
    response: {
      stamp: [],
      text: [],
    },
  },
  9: {
    category: categories.kansya,
    text: 'いつもありがとう',
    response: {
      stamp: [],
      text: [],
    },
  },
  10: {
    category: categories.kansya,
    text: 'さんきゅーぅ',
    response: {
      stamp: [],
      text: [],
    },
  },
  11: {
    category: categories.kansya,
    text: 'マジ感謝',
    response: {
      stamp: [],
      text: [],
    },
  },
  12: {
    category: categories.aisatsu,
    text: 'おはよっす',
    response: {
      stamp: [],
      text: [],
    },
  },
  13: {
    category: categories.aisatsu,
    text: 'こんにちは',
    response: {
      stamp: [],
      text: [],
    },
  },
  14: {
    category: categories.aisatsu,
    text: 'こんばんは',
    response: {
      stamp: [],
      text: [],
    },
  },
  15: {
    category: categories.aisatsu,
    text: '今日もよろしくです',
    response: {
      stamp: [],
      text: [],
    },
  },
  16: {
    category: categories.aisatsu,
    text: 'また明日',
    response: {
      stamp: [],
      text: [],
    },
  },
  17: {
    category: categories.gohan,
    text: 'おなかすいた～',
    response: {
      stamp: [43, 44],
      text: [18],
    },
  },
  18: {
    category: categories.gohan,
    text: 'ごはん食べた？',
    response: {
      stamp: [],
      text: [19, 20],
    },
  },
  19: {
    category: categories.gohan,
    text: '食べたよ',
    response: {
      stamp: [],
      text: [],
    },
  },
  20: {
    category: categories.gohan,
    text: 'まだ～',
    response: {
      stamp: [],
      text: [],
    },
  },
};

const btnColors = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'];

const textDataValuesAddedKey = Object.keys(textsData).map((key) => ({
  key,
  category: textsData[key].category,
  text: textsData[key].text,
}));

const categoryValues = Object.keys(categories).map((key) => categories[key]);

const textsKeyTextAndBtnColorObjects = [];
categoryValues.forEach((category, index) => {
  textDataValuesAddedKey.forEach((value) => {
    if (value.category === category) {
      textsKeyTextAndBtnColorObjects.push({
        key: value.key,
        text: value.text,
        btnColor: btnColors[index % btnColors.length],
      });
    }
  });
});

console.log(textsKeyTextAndBtnColorObjects);

module.exports = {
  textsData,
  textsKeyTextAndBtnColorObjects,
};

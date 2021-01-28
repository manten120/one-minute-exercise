// vscode(コードエディタ)で補完を効かせるため用意
const categories = {
  tassei: '達成',
  gekirei: '激励',
  kansya: '感謝',
  aisatsu: '挨拶',
  gohan: '御飯',
  tenki: '天気',
  kion: '気温',
  henji: '返事',
  shitsumon: '質問',
};

const textsData = {
  0: {
    category: categories.tassei,
    text: 'おつかれさまでした✨',
    response: {
      stamp: [1, 2, 3, 5, 6, 7],
      text: [0, 1, 4, 8, 10, 21, 22, 23, 38],
    },
  },
  1: {
    category: categories.tassei,
    text: 'つかれたぁ～💦',
    response: {
      stamp: [1, 2, 3, 5, 6, 7, 11],
      text: [0, 4, 7, 21, 22, 24, 51],
    },
  },
  2: {
    category: categories.tassei,
    text: 'リフレッシュできた❤',
    response: {
      stamp: [49],
      text: [4],
    },
  },
  4: {
    category: categories.gekirei,
    text: '次の1時間も頑張ろう⏰',
    response: {
      stamp: [16, 17, 18],
      text: [6, 8, 25],
    },
  },
  5: {
    category: categories.gekirei,
    text: '今日も頑張ろう🔥',
    response: {
      stamp: [16, 17, 18, 13, 49],
      text: [6, 15, 25],
    },
  },
  6: {
    category: categories.gekirei,
    text: 'ぼちぼちやっていきましょう～',
    response: {
      stamp: [16, 17, 18, 13, 49],
      text: [7, 25, 53, 54, 55],
    },
  },
  7: {
    category: categories.gekirei,
    text: '無理しないでね💦',
    response: {
      stamp: [28, 29, 30, 31],
      text: [8, 10, 11, 25],
    },
  },
  8: {
    category: categories.kansya,
    text: 'ありがとう❤',
    response: {
      stamp: [49],
      text: [25],
    },
  },
  9: {
    category: categories.kansya,
    text: 'いつもありがとう😍',
    response: {
      stamp: [49],
      text: [25],
    },
  },
  10: {
    category: categories.kansya,
    text: 'さんきゅーぅ❣',
    response: {
      stamp: [49],
      text: [],
    },
  },
  11: {
    category: categories.kansya,
    text: 'マジ感謝✨',
    response: {
      stamp: [49],
      text: [],
    },
  },
  12: {
    category: categories.aisatsu,
    text: 'おはよう☀',
    response: {
      stamp: [21, 22],
      text: [12, 42, 53, 54, 55],
    },
  },
  13: {
    category: categories.aisatsu,
    text: 'こんにちは😊',
    response: {
      stamp: [24, 25],
      text: [13, 43],
    },
  },
  14: {
    category: categories.aisatsu,
    text: 'こんばんは🌙',
    response: {
      stamp: [26, 27],
      text: [14, 44],
    },
  },
  15: {
    category: categories.aisatsu,
    text: '今日もよろしくです^^',
    response: {
      stamp: [13, 49, 17, 18],
      text: [5, 25],
    },
  },
  16: {
    category: categories.aisatsu,
    text: 'また明日👋',
    response: {
      stamp: [5, 6],
      text: [16, 25, 21, 22, 25, 41, 45],
    },
  },
  17: {
    category: categories.gohan,
    text: 'おなかすいた～😭',
    response: {
      stamp: [43, 44],
      text: [51],
    },
  },
  18: {
    category: categories.gohan,
    text: 'ごはん食べた？🍚',
    response: {
      stamp: [50, 51],
      text: [19, 20, 46, 47],
    },
  },
  19: {
    category: categories.gohan,
    text: '食べたよ😋',
    response: {
      stamp: [49],
      text: [49],
    },
  },
  20: {
    category: categories.gohan,
    text: 'まだ～💦',
    response: {
      stamp: [45, 48],
      text: [49],
    },
  },
  21: {
    category: categories.tassei,
    text: 'おつです😊',
    response: {
      stamp: [],
      text: [],
    },
  },
  22: {
    category: categories.tassei,
    text: '乙カレー🍛',
    response: {
      stamp: [],
      text: [],
    },
  },
  23: {
    category: categories.tassei,
    text: 'きつかったぁ💦',
    response: {
      stamp: [7, 10, 11],
      text: [7, 24, 51],
    },
  },
  24: {
    category: categories.gohan,
    text: '水分補給わすれずに😤',
    response: {
      stamp: [29, 31, 49],
      text: [25],
    },
  },
  25: {
    category: categories.gohan,
    text: 'は～い✨',
    response: {
      stamp: [],
      text: [],
    },
  },
  26: {
    category: categories.tenki,
    text: '天気どうですか？',
    response: {
      stamp: [],
      text: [27, 28, 29, 30],
    },
  },
  27: {
    category: categories.tenki,
    text: '晴れてる☀',
    response: {
      stamp: [49],
      text: [49, 48],
    },
  },
  28: {
    category: categories.tenki,
    text: 'くもり☁',
    response: {
      stamp: [],
      text: [49],
    },
  },
  29: {
    category: categories.tenki,
    text: '降りそう☁',
    response: {
      stamp: [33],
      text: [49],
    },
  },
  30: {
    category: categories.tenki,
    text: '雨ふってる☔',
    response: {
      stamp: [35],
      text: [49],
    },
  },
  31: {
    category: categories.tenki,
    text: '土砂降り☔',
    response: {
      stamp: [33],
      text: [49],
    },
  },
  32: {
    category: categories.tenki,
    text: '台風やばい🌀☔',
    response: {
      stamp: [35],
      text: [49, 50],
    },
  },
  33: {
    category: categories.tenki,
    text: '雪⛄',
    response: {
      stamp: [],
      text: [48],
    },
  },
  34: {
    category: categories.kion,
    text: 'あつい🔥💦',
    response: {
      stamp: [],
      text: [],
    },
  },
  35: {
    category: categories.kion,
    text: '寒い🥶❄',
    response: {
      stamp: [],
      text: [],
    },
  },
  36: {
    category: categories.kion,
    text: '涼しい✨',
    response: {
      stamp: [],
      text: [],
    },
  },
  37: {
    category: categories.kion,
    text: '快適😆',
    response: {
      stamp: [],
      text: [],
    },
  },
  38: {
    category: categories.tassei,
    text: 'もう無理～😭',
    response: {
      stamp: [7, 9, 13, 8, 15],
      text: [7, 51],
    },
  },
  39: {
    category: categories.kansya,
    text: '元気出ました🔥',
    response: {
      stamp: [49],
      text: [],
    },
  },
  40: {
    category: categories.gekirei,
    text: 'いつも頑張ってるね✨',
    response: {
      stamp: [29, 30, 32, 49],
      text: [8, 10, 11],
    },
  },
  41: {
    category: categories.aisatsu,
    text: 'おやすみ～💤',
    response: {
      stamp: [37, 38],
      text: [25, 41, 41],
    },
  },
  42: {
    category: categories.aisatsu,
    text: 'Good Morning!!',
    response: {
      stamp: [21, 22],
      text: [12, 5, 42, 53, 54, 55],
    },
  },
  43: {
    category: categories.aisatsu,
    text: 'Hello!!',
    response: {
      stamp: [25],
      text: [13, 43],
    },
  },
  44: {
    category: categories.aisatsu,
    text: 'Good Evening!!',
    response: {
      stamp: [26, 27],
      text: [14, 44],
    },
  },
  45: {
    category: categories.aisatsu,
    text: 'Good Night!!',
    response: {
      stamp: [7],
      text: [41, 45],
    },
  },
  46: {
    category: categories.henji,
    text: 'YES👍',
    response: {
      stamp: [],
      text: [],
    },
  },
  47: {
    category: categories.henji,
    text: 'NO❌',
    response: {
      stamp: [],
      text: [],
    },
  },
  48: {
    category: categories.henji,
    text: 'おお～😳',
    response: {
      stamp: [],
      text: [],
    },
  },
  49: {
    category: categories.henji,
    text: 'そうなんだ～',
    response: {
      stamp: [],
      text: [],
    },
  },
  50: {
    category: categories.henji,
    text: '気をつけて💦',
    response: {
      stamp: [28, 31],
      text: [25, 10],
    },
  },
  51: {
    category: categories.henji,
    text: 'だよね～✨',
    response: {
      stamp: [],
      text: [],
    },
  },
  53: {
    category: categories.shitsumon,
    text: '今日仕事？',
    response: {
      stamp: [50, 51, 33],
      text: [46, 47],
    },
  },
  54: {
    category: categories.shitsumon,
    text: '今日学校？',
    response: {
      stamp: [50, 51],
      text: [46, 47],
    },
  },
  55: {
    category: categories.shitsumon,
    text: '今日休み？',
    response: {
      stamp: [50, 51],
      text: [46, 47],
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

// textsDataのうちcategoryがcategories.tasseiである要素のtextを格納した配列
const sayFinTexts = Object.keys(textsData)
  .map((key) => {
    if (textsData[key].category === categories.tassei) {
      return textsData[key].text;
    }
    return '';
  })
  .filter((item) => item);

module.exports = {
  textsData,
  textsKeyTextAndBtnColorObjects,
  sayFinTexts,
};

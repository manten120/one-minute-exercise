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
      stamp: [],
      text: [],
    },
  },
  1: {
    category: categories.tassei,
    text: 'つかれたぁ～💦',
    response: {
      stamp: [],
      text: [],
    },
  },
  2: {
    category: categories.tassei,
    text: 'リフレッシュできた❤',
    response: {
      stamp: [],
      text: [],
    },
  },
  4: {
    category: categories.gekirei,
    text: '次の1時間も頑張ろう⏰',
    response: {
      stamp: [],
      text: [],
    },
  },
  5: {
    category: categories.gekirei,
    text: '今日も頑張ろう🔥',
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
    text: '無理しないでね💦',
    response: {
      stamp: [],
      text: [],
    },
  },
  8: {
    category: categories.kansya,
    text: 'ありがとう❤',
    response: {
      stamp: [],
      text: [],
    },
  },
  9: {
    category: categories.kansya,
    text: 'いつもありがとう😍',
    response: {
      stamp: [],
      text: [],
    },
  },
  10: {
    category: categories.kansya,
    text: 'さんきゅーぅ❣',
    response: {
      stamp: [],
      text: [],
    },
  },
  11: {
    category: categories.kansya,
    text: 'マジ感謝✨',
    response: {
      stamp: [],
      text: [],
    },
  },
  12: {
    category: categories.aisatsu,
    text: 'おはよう☀',
    response: {
      stamp: [],
      text: [],
    },
  },
  13: {
    category: categories.aisatsu,
    text: 'こんにちは😊',
    response: {
      stamp: [],
      text: [],
    },
  },
  14: {
    category: categories.aisatsu,
    text: 'こんばんは🌙',
    response: {
      stamp: [],
      text: [],
    },
  },
  15: {
    category: categories.aisatsu,
    text: '今日もよろしくです^^',
    response: {
      stamp: [],
      text: [],
    },
  },
  16: {
    category: categories.aisatsu,
    text: 'また明日👋',
    response: {
      stamp: [],
      text: [],
    },
  },
  17: {
    category: categories.gohan,
    text: 'おなかすいた～😭',
    response: {
      stamp: [43, 44],
      text: [18],
    },
  },
  18: {
    category: categories.gohan,
    text: 'ごはん食べた？🍚',
    response: {
      stamp: [],
      text: [19, 20],
    },
  },
  19: {
    category: categories.gohan,
    text: '食べたよ😋',
    response: {
      stamp: [],
      text: [],
    },
  },
  20: {
    category: categories.gohan,
    text: 'まだ～💦',
    response: {
      stamp: [],
      text: [],
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
      stamp: [],
      text: [],
    },
  },
  24: {
    category: categories.gohan,
    text: '水分補給わすれずに😤',
    response: {
      stamp: [],
      text: [],
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
      text: [],
    },
  },
  27: {
    category: categories.tenki,
    text: '晴れてる☀',
    response: {
      stamp: [],
      text: [],
    },
  },
  28: {
    category: categories.tenki,
    text: 'くもり☁',
    response: {
      stamp: [],
      text: [],
    },
  },
  29: {
    category: categories.tenki,
    text: '降りそう☁',
    response: {
      stamp: [],
      text: [],
    },
  },
  30: {
    category: categories.tenki,
    text: '雨ふってる☔',
    response: {
      stamp: [],
      text: [],
    },
  },
  31: {
    category: categories.tenki,
    text: '土砂降り☔',
    response: {
      stamp: [],
      text: [],
    },
  },
  32: {
    category: categories.tenki,
    text: '台風やばい🌀☔',
    response: {
      stamp: [],
      text: [],
    },
  },
  33: {
    category: categories.tenki,
    text: '雪⛄',
    response: {
      stamp: [],
      text: [],
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
      stamp: [],
      text: [],
    },
  },
  39: {
    category: categories.tassei,
    text: '元気出ました🔥',
    response: {
      stamp: [],
      text: [],
    },
  },
  40: {
    category: categories.gekirei,
    text: 'いつも頑張ってるね✨',
    response: {
      stamp: [],
      text: [],
    },
  },
  41: {
    category: categories.aisatsu,
    text: 'おやすみ～💤',
    response: {
      stamp: [],
      text: [],
    },
  },
  42: {
    category: categories.aisatsu,
    text: 'Good Morning!!',
    response: {
      stamp: [],
      text: [],
    },
  },
  43: {
    category: categories.aisatsu,
    text: 'Hello!!',
    response: {
      stamp: [],
      text: [],
    },
  },
  44: {
    category: categories.aisatsu,
    text: 'Good Evening!!',
    response: {
      stamp: [],
      text: [],
    },
  },
  45: {
    category: categories.aisatsu,
    text: 'Good Night!!',
    response: {
      stamp: [],
      text: [],
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
      stamp: [],
      text: [],
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
  52: {
    category: categories.henji,
    text: 'だよね～✨',
    response: {
      stamp: [],
      text: [],
    },
  },
  53: {
    category: categories.shitsumon,
    text: '今日仕事?',
    response: {
      stamp: [],
      text: [],
    },
  },
  54: {
    category: categories.shitsumon,
    text: '今日学校?',
    response: {
      stamp: [],
      text: [],
    },
  },
  55: {
    category: categories.shitsumon,
    text: '今日休み?',
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

module.exports = {
  textsData,
  textsKeyTextAndBtnColorObjects,
};

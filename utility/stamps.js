// vscode(コードエディタ)で補完を効かせるため用意
const categories = {
  otsukaresama: 'おつかれさま',
  ganbarou: 'がんばろう',
  ohayou: 'おはよう',
  konnichiwa: 'こんにちは',
  konbanwa: 'こんばんは',
  arigatou: 'ありがとう',
  tsukareta: 'つかれた',
  nemui: 'ねむい',
  gohan: 'ごはん',
  henji: 'へんじ',
};

const stampsData = {
  1: {
    category: categories.otsukaresama,
    src: 'images/stamps/1-min.jpg',
    response: {
      stamp: [2, 3],
      text: [0, 1, 4],
    },
  },
  2: {
    category: categories.otsukaresama,
    src: 'images/stamps/2-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  3: {
    category: categories.otsukaresama,
    src: 'images/stamps/3-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  5: {
    category: categories.otsukaresama,
    src: 'images/stamps/5-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  6: {
    category: categories.otsukaresama,
    src: 'images/stamps/6-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  7: {
    category: categories.otsukaresama,
    src: 'images/stamps/7-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  8: {
    category: categories.ganbarou,
    src: 'images/stamps/8-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  9: {
    category: categories.ganbarou,
    src: 'images/stamps/9-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  10: {
    category: categories.ganbarou,
    src: 'images/stamps/10-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  11: {
    category: categories.ganbarou,
    src: 'images/stamps/11-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  13: {
    category: categories.ganbarou,
    src: 'images/stamps/13-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  15: {
    category: categories.ganbarou,
    src: 'images/stamps/15-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  16: {
    category: categories.ganbarou,
    src: 'images/stamps/16-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  17: {
    category: categories.ganbarou,
    src: 'images/stamps/17-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  18: {
    category: categories.ganbarou,
    src: 'images/stamps/18-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  21: {
    category: categories.ohayou,
    src: 'images/stamps/21-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  22: {
    category: categories.ohayou,
    src: 'images/stamps/22-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  23: {
    category: categories.konnichiwa,
    src: 'images/stamps/23-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  24: {
    category: categories.konnichiwa,
    src: 'images/stamps/24-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  25: {
    category: categories.konnichiwa,
    src: 'images/stamps/25-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  26: {
    category: categories.konbanwa,
    src: 'images/stamps/26-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  27: {
    category: categories.konbanwa,
    src: 'images/stamps/27-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  28: {
    category: categories.arigatou,
    src: 'images/stamps/28-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  29: {
    category: categories.arigatou,
    src: 'images/stamps/29-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  30: {
    category: categories.arigatou,
    src: 'images/stamps/30-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  31: {
    category: categories.arigatou,
    src: 'images/stamps/31-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  32: {
    category: categories.arigatou,
    src: 'images/stamps/32-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  33: {
    category: categories.tsukareta,
    src: 'images/stamps/33-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  34: {
    category: categories.tsukareta,
    src: 'images/stamps/34-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  35: {
    category: categories.tsukareta,
    src: 'images/stamps/35-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  36: {
    category: categories.tsukareta,
    src: 'images/stamps/36-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  37: {
    category: categories.nemui,
    src: 'images/stamps/37-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  38: {
    category: categories.nemui,
    src: 'images/stamps/38-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  39: {
    category: categories.nemui,
    src: 'images/stamps/39-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  40: {
    category: categories.nemui,
    src: 'images/stamps/40-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  41: {
    category: categories.nemui,
    src: 'images/stamps/41-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  43: {
    category: categories.gohan,
    src: 'images/stamps/43-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  44: {
    category: categories.gohan,
    src: 'images/stamps/44-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  45: {
    category: categories.gohan,
    src: 'images/stamps/45-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  46: {
    category: categories.gohan,
    src: 'images/stamps/46-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  47: {
    category: categories.gohan,
    src: 'images/stamps/47-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  48: {
    category: categories.gohan,
    src: 'images/stamps/48-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  49: {
    category: categories.henji,
    src: 'images/stamps/good.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  50: {
    category: categories.henji,
    src: 'images/stamps/yes.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  51: {
    category: categories.henji,
    src: 'images/stamps/no.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
};

const stampsDataValuesAddedKey = Object.keys(stampsData).map((key) => ({
  key,
  category: stampsData[key].category,
  src: stampsData[key].src,
}));

const categoryValues = Object.keys(categories).map((key) => categories[key]);

const stampsKeyAndSrcPairs = [];
categoryValues.forEach((category) => {
  stampsDataValuesAddedKey.forEach((value) => {
    if (value.category === category) {
      stampsKeyAndSrcPairs.push({ key: value.key, src: value.src });
    }
  });
});

// stampsDataのうちcategoryがcategories.otsukaresamaである要素のtextを格納した配列
const sayFinStamps = Object.keys(stampsData)
  .map((key) => {
    if (stampsData[key].category === categories.otsukaresama) {
      return stampsData[key].src;
    }
    return '';
  })
  .filter((item) => item);

module.exports = {
  stampsData,
  stampsKeyAndSrcPairs,
  sayFinStamps,
};

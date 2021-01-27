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
      stamp: [1, 2, 3, 5, 6, 7],
      text: [0, 1, 4, 22],
    },
  },
  2: {
    category: categories.otsukaresama,
    src: 'images/stamps/2-min.jpg',
    response: {
      stamp: [1, 2, 3, 5, 6, 7],
      text: [0, 1, 4, 22],
    },
  },
  3: {
    category: categories.otsukaresama,
    src: 'images/stamps/3-min.jpg',
    response: {
      stamp: [1, 2, 3, 5, 6, 7],
      text: [0, 1, 4, 22],
    },
  },
  5: {
    category: categories.otsukaresama,
    src: 'images/stamps/5-min.jpg',
    response: {
      stamp: [1, 2, 3, 5, 6, 7],
      text: [0, 1, 4, 22],
    },
  },
  6: {
    category: categories.otsukaresama,
    src: 'images/stamps/6-min.jpg',
    response: {
      stamp: [1, 2, 3, 5, 6, 7],
      text: [0, 1, 4, 22],
    },
  },
  7: {
    category: categories.otsukaresama,
    src: 'images/stamps/7-min.jpg',
    response: {
      stamp: [1, 2, 3, 5, 6, 7],
      text: [0, 1, 4, 22],
    },
  },
  8: {
    category: categories.ganbarou,
    src: 'images/stamps/8-min.jpg',
    response: {
      stamp: [16, 17, 18],
      text: [6],
    },
  },
  9: {
    category: categories.ganbarou,
    src: 'images/stamps/9-min.jpg',
    response: {
      stamp: [16, 17, 18],
      text: [8, 10],
    },
  },
  10: {
    category: categories.ganbarou,
    src: 'images/stamps/10-min.jpg',
    response: {
      stamp: [29, 31],
      text: [8, 10],
    },
  },
  11: {
    category: categories.ganbarou,
    src: 'images/stamps/11-min.jpg',
    response: {
      stamp: [29, 31],
      text: [8, 10],
    },
  },
  13: {
    category: categories.ganbarou,
    src: 'images/stamps/13-min.jpg',
    response: {
      stamp: [16, 17, 18],
      text: [25],
    },
  },
  15: {
    category: categories.ganbarou,
    src: 'images/stamps/15-min.jpg',
    response: {
      stamp: [16, 17, 18, 29, 31, 49],
      text: [8, 10],
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
      stamp: [21, 22],
      text: [12, 42, 53, 54, 55],
    },
  },
  22: {
    category: categories.ohayou,
    src: 'images/stamps/22-min.jpg',
    response: {
      stamp: [21, 22],
      text: [12, 42, 53, 54, 55],
    },
  },
  23: {
    category: categories.konnichiwa,
    src: 'images/stamps/23-min.jpg',
    response: {
      stamp: [23, 24, 25],
      text: [13, 43],
    },
  },
  24: {
    category: categories.konnichiwa,
    src: 'images/stamps/24-min.jpg',
    response: {
      stamp: [23, 24, 25],
      text: [13, 43],
    },
  },
  25: {
    category: categories.konnichiwa,
    src: 'images/stamps/25-min.jpg',
    response: {
      stamp: [23, 24, 25],
      text: [13, 43],
    },
  },
  26: {
    category: categories.konbanwa,
    src: 'images/stamps/26-min.jpg',
    response: {
      stamp: [26, 27],
      text: [14, 44],
    },
  },
  27: {
    category: categories.konbanwa,
    src: 'images/stamps/27-min.jpg',
    response: {
      stamp: [26, 27],
      text: [14, 44],
    },
  },
  28: {
    category: categories.arigatou,
    src: 'images/stamps/28-min.jpg',
    response: {
      stamp: [49],
      text: [25],
    },
  },
  29: {
    category: categories.arigatou,
    src: 'images/stamps/29-min.jpg',
    response: {
      stamp: [49],
      text: [25],
    },
  },
  30: {
    category: categories.arigatou,
    src: 'images/stamps/30-min.jpg',
    response: {
      stamp: [49],
      text: [25],
    },
  },
  31: {
    category: categories.arigatou,
    src: 'images/stamps/31-min.jpg',
    response: {
      stamp: [49],
      text: [25],
    },
  },
  32: {
    category: categories.arigatou,
    src: 'images/stamps/32-min.jpg',
    response: {
      stamp: [49],
      text: [25],
    },
  },
  33: {
    category: categories.tsukareta,
    src: 'images/stamps/33-min.jpg',
    response: {
      stamp: [9, 13, 15],
      text: [0, 7],
    },
  },
  34: {
    category: categories.tsukareta,
    src: 'images/stamps/34-min.jpg',
    response: {
      stamp: [9, 13, 15],
      text: [0, 7],
    },
  },
  35: {
    category: categories.tsukareta,
    src: 'images/stamps/35-min.jpg',
    response: {
      stamp: [9, 13, 15],
      text: [0, 7],
    },
  },
  36: {
    category: categories.tsukareta,
    src: 'images/stamps/36-min.jpg',
    response: {
      stamp: [9, 13, 15],
      text: [0, 7],
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
      text: [41],
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
      stamp: [45, 48],
      text: [],
    },
  },
  44: {
    category: categories.gohan,
    src: 'images/stamps/44-min.jpg',
    response: {
      stamp: [45, 48],
      text: [],
    },
  },
  45: {
    category: categories.gohan,
    src: 'images/stamps/45-min.jpg',
    response: {
      stamp: [43, 44],
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
      stamp: [43, 44],
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

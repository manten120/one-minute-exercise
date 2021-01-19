const stampsData = {
  // '0': {
  //   category: '',
  //   src: 'images/stamps/0.jpg',
  //   response: {
  //     stamp: [],
  //     text: [],
  //   }
  // },
  1: {
    category: '',
    src: 'images/stamps/1-min.jpg',
    response: {
      stamp: [2, 3],
      text: [0, 1, 4],
    },
  },
  2: {
    category: '',
    src: 'images/stamps/2-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  3: {
    category: '',
    src: 'images/stamps/3-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
  4: {
    category: '',
    src: 'images/stamps/4-min.jpg',
    response: {
      stamp: [],
      text: [],
    },
  },
};

const stampsKeyAndSrcPairs = Object.keys(stampsData).map((key) => ({ key, src: stampsData[key].src }));

module.exports = {
  stampsData,
  stampsKeyAndSrcPairs,
};

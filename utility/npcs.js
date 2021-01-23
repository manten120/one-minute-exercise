const { stampsData } = require('./stamps');
const { textsData } = require('./texts');

const npcs = [
  {
    name: 'ウホホイ',
    icon: 'images/icons/gorilla1.jpg',
  },
  {
    name: 'まつり',
    icon: 'images/icons/frog1.jpg',
  },
  {
    name: 'ミドリ',
    icon: 'images/icons/frog3.jpg',
  },
  {
    name: 'シンゴー',
    icon: 'images/icons/frog2.jpg',
  },
  {
    name: 'かずゆき',
    icon: 'images/icons/boy1.jpg',
  },
  {
    name: '*H a n a*',
    icon: 'images/icons/girl2.jpg',
  },
  {
    name: 'カダヤピ',
    icon: 'images/icons/bird1.jpg',
  },
  {
    name: '海',
    icon: 'images/icons/cat3.jpg',
  },
  {
    name: 'カダヤピ',
    icon: 'images/icons/bird1.jpg',
  },
  {
    name: 'めい',
    icon: 'images/icons/girl2.jpg',
  },
  {
    name: 'ラオウ',
    icon: 'images/icons/girl2.jpg',
  },
  {
    name: 'ハルハル',
    icon: 'images/icons/dog2.jpg',
  },
  {
    name: 'ちえ',
    icon: 'images/icons/girl1.jpg',
  },
  {
    name: 'ここあ',
    icon: 'images/icons/dog1.jpg',
  },
  {
    name: 'とり肉',
    icon: 'images/icons/bird2.jpg',
  },
  {
    name: 'ビットコ',
    icon: 'images/icons/rabbit2.jpg',
  },
  {
    name: 'としぞう',
    icon: 'images/icons/cat1.jpg',
  },
  {
    name: '石塚',
    icon: 'images/icons/cat2.jpg',
  },
  {
    name: 'よっちゃん',
    icon: 'images/icons/rabbit1.jpg',
  },
  {
    name: 'ヒデト',
    icon: 'images/icons/dog3.jpg',
  },
  {
    name: 'たいちゃん',
    icon: 'images/icons/boy2.jpg',
  },
];

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

class Npc {
  constructor(prevIndex = getRandomIndex(npcs.length)) {
    this.index = getRandomIndex(npcs);
    while (this.index === prevIndex) {
      this.index = getRandomIndex(npcs);
    }

    this.name = npcs[this.index].name;
    this.icon = npcs[this.index].icon;

    this.isAlive = true;
    this.secondsToChooseMenu = Math.floor(Math.random() * 4) + 2;

    this.canPostMenu = true;
    this.isCoolDown = false;
    this.responseProbability = Math.random();
    this.mentionProbability = Math.random();
  }

  coolDown(seconds) {
    this.isCoolDown = true;
    setTimeout(() => {
      this.isCoolDown = false;
    }, seconds * 1000);
  }

  postMenu(io, randomMenus) {
    this.canPostMenu = false;

    const emitData = {
      to: '',
      from: {
        name: this.name,
        icon: this.icon,
      },
      src: randomMenus[getRandomIndex(randomMenus)].src,
    };

    setTimeout(() => {
      io.emit('someone posts menu', emitData);
      this.coolDown(60);

      setTimeout(() => {
        this.isAlive = false;
      }, 75 * 1000);

      setTimeout(() => {
        emitData.src = 'images/stamps/1-min.jpg';
        io.emit('someone posts stamp', emitData);
      }, 60 * 1000);
    }, this.secondsToChooseMenu * 1000);
  }

  response(io, data) {
    if (!this.isAlive || this.isCoolDown) {
      return;
    }

    this.coolDown(3);

    let responsePostType; // 'stamp' or 'text'

    const responseTimeLag = Math.floor((Math.random() * 3 + 1) * 1000);

    const emitData = {
      to: '',
      from: {
        name: this.name,
        icon: this.icon,
      },
      // and
      // src: 'スタンプ画像のurl'
      // or
      // text: '返信内容のテキスト'
    };

    if (Math.random() < this.mentionProbability) {
      emitData.to = data.from;
    }

    if (data.type === 'stamp') {
      const { response } = stampsData[data.key];
      if (response.stamp.length === 0 && response.text.length === 0) {
        return;
      }

      const stampProbability = response.stamp.length / (response.stamp.length + response.text.length);

      if (Math.random() < stampProbability) {
        responsePostType = 'stamp';
        const index = Math.floor(response.stamp.length * Math.random());
        const key = response.stamp[index];
        const { src } = stampsData[key];
        emitData.src = src;
      } else {
        responsePostType = 'text';
        const index = Math.floor(response.text.length * Math.random());
        const key = response.text[index];
        const { text } = textsData[key];
        emitData.text = text;
      }
    } else {
      const { response } = textsData[data.key];
      if (response.stamp.length === 0 && response.text.length === 0) {
        return;
      }

      const stampProbability = response.stamp.length / (response.stamp.length + response.text.length);

      if (Math.random() < stampProbability) {
        responsePostType = 'stamp';
        const index = Math.floor(response.stamp.length * Math.random());
        const key = response.stamp[index];
        const { src } = stampsData[key];
        emitData.src = src;
      } else {
        responsePostType = 'text';
        const index = Math.floor(response.text.length * Math.random());
        const key = response.text[index];
        const { text } = textsData[key];
        emitData.text = text;
      }
    }

    setTimeout(() => {
      io.emit(`someone posts ${responsePostType}`, emitData);
    }, responseTimeLag);
  }
}

module.exports = { Npc };

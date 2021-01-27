const { stampsData } = require('./stamps');
const { textsData } = require('./texts');

const npcs = [
  {
    name: 'ウホホイ',
    icon: 'images/icons/gorilla1.jpg',
  },
  {
    name: 'まつり',
    icon: 'images/icons/fox1.jpg',
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
    name: 'さめーちゃん',
    icon: 'images/icons/same1.jpg',
  },
  {
    name: 'なまじぃ',
    icon: 'images/icons/edo.jpg',
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
  {
    name: '名無し',
    icon: 'images/icons/pig.jpg',
  },
];

const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

class Npc {
  constructor(prevIndex = getRandomIndex(npcs.length)) {
    // 配列npcsからランダムにnpcの名前とアイコンを決定する
    this.index = getRandomIndex(npcs);
    while (this.index === prevIndex) {
      this.index = getRandomIndex(npcs);
    }
    this.name = npcs[this.index].name;
    this.icon = npcs[this.index].icon;

    // エクササイズメニュー投稿,エクササイズ時間1分経過,コミュニケーション時間(約15秒)経過後に
    // falseになり、npcは活動不可になったものとする
    this.isAlive = true;

    // trueのときメニューを投稿できる
    this.canPostMenu = true;

    // npc生成後1人目のユーザーがアクセスしてからnpcがメニューを投稿するまでにかかる秒数
    this.secondsToChooseMenu = Math.floor(Math.random() * 4) + 2;

    // npcがエクササイズ時間1分を終えてから投稿するまでにかかる秒数
    this.secondsToSayFin = Math.floor(Math.random() * 3) + 1;

    // trueのとき投稿(返信含む)禁止時間中とする
    this.isCoolDown = false;

    // 返信する確率 0.5~1未満
    this.responseProbability = (5 + 5 * Math.random()) / 10;
    // 返信の際にメンションする確率
    this.mentionProbability = Math.random();
  }

  // seconds秒だけnpcの投稿を禁止する
  coolDown(seconds) {
    this.isCoolDown = true;
    setTimeout(() => {
      this.isCoolDown = false;
    }, seconds * 1000);
  }

  // メニューを投稿する
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

      // エクササイズ中の返信を禁止する
      this.coolDown(60);

      // エクササイズ終了後に投稿する
      setTimeout(() => {
        emitData.src = 'images/stamps/1-min.jpg';
        io.emit('someone posts stamp', emitData);
      }, (60 + this.secondsToSayFin) * 1000);

      setTimeout(() => {
        this.isAlive = false;
      }, 82 * 1000);
    }, this.secondsToChooseMenu * 1000);
  }

  response(io, data) {
    // npcが活動不可,または投稿禁止時間のとき
    if (!this.isAlive || this.isCoolDown) {
      return;
    }

    // 返信しないとき
    if (this.responseProbability < Math.random()) {
      return;
    }

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

    // メンションするとき
    if (Math.random() < this.mentionProbability) {
      emitData.to = data.from;
    }

    // 返信の種類
    let responsePostType; // 'stamp' or 'text'

    if (data.type === 'stamp') {
      // ユーザーがスタンプを投稿したとき

      // ユーザーが投稿したスタンプのデータを取得する
      const { response } = stampsData[data.key];

      // 返信の候補が存在しないとき
      if (response.stamp.length === 0 && response.text.length === 0) {
        return;
      }

      // スタンプを返信する確率
      const stampProbability = response.stamp.length / (response.stamp.length + response.text.length);

      if (Math.random() < stampProbability) {
        // スタンプを返信するとき スタンプを決める
        responsePostType = 'stamp';
        const index = Math.floor(response.stamp.length * Math.random());
        const key = response.stamp[index];
        const { src } = stampsData[key];
        emitData.src = src;
      } else {
        // テキストを返信するとき テキストを決める
        responsePostType = 'text';
        const index = Math.floor(response.text.length * Math.random());
        const key = response.text[index];
        const { text } = textsData[key];
        emitData.text = text;
      }
    } else {
      // ユーザーがテキストを投稿したとき

      // ユーザーが投稿したテキストのデータを取得する
      const { response } = textsData[data.key];

      // 返信の候補が存在しないとき
      if (response.stamp.length === 0 && response.text.length === 0) {
        return;
      }

      // スタンプを返信する確率
      const stampProbability = response.stamp.length / (response.stamp.length + response.text.length);

      if (Math.random() < stampProbability) {
        // スタンプを返信するとき スタンプを決める
        responsePostType = 'stamp';
        const index = Math.floor(response.stamp.length * Math.random());
        const key = response.stamp[index];
        const { src } = stampsData[key];
        emitData.src = src;
      } else {
        // テキストを返信するとき テキストを決める
        responsePostType = 'text';
        const index = Math.floor(response.text.length * Math.random());
        const key = response.text[index];
        const { text } = textsData[key];
        emitData.text = text;
      }
    }

    // 返信までにかかる時間(ミリ秒)
    const responseTimeLag = Math.floor((Math.random() * 3 + 1) * 1000);

    // socket.ioイベント送信 npcによる返信
    setTimeout(() => {
      io.emit(`someone posts ${responsePostType}`, emitData);
    }, responseTimeLag);

    // 短いスパンで連続で返信することを禁止する
    this.coolDown(3);
  }
}

module.exports = { Npc };

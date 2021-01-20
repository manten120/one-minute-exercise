const { stampsData } = require('../utility/stamps');
const { textsData } = require('../utility/texts');

let npc;
let indexOfPreviousNpc;

let npcExists = false;
let coolDown = false;

const setCoolDown = (coolDownTimeSeconds) => {
  coolDown = true;
  setTimeout(() => {
    coolDown = false;
  }, coolDownTimeSeconds * 1000);
};

const npcs = [
  {
    name: 'ばなな',
    icon: 'images/icons/gorilla1.jpg',
  },
  {
    name: 'みどり',
    icon: 'images/icons/frog1.jpg',
  },
  {
    name: 'ヤス',
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
];

function createWebSocketServer(io) {
  const rootIo = io.of('/');
  rootIo.on('connection', (socket) => {
    console.log('WebSocket のコネクションがありました。');

    // 同時接続者数(ただしトップページ閲覧者も含む)
    console.log('client count: ', rootIo.sockets.size);

    socket.emit('start data', {});

    socket.on('disconnect', () => {});

    socket.on('post my menu', (data) => {
      /**
       * data = {
       *   to: '',
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   src: 'メニュー画像のurl'
       * };
       */

      socket.broadcast.emit('someone posts menu', data);
    });

    socket.on('post my stamp', (data) => {
      /**
       * data = {
       *   to: {
       *     name : '返信相手の名前'
       *     icon: '返信相手のアイコンのパス',
       *   },
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   src: 'スタンプ画像のurl'
       * };
       *
       * または
       * data = {
       *   to: '',
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   src: 'スタンプ画像のurl'
       * };
       */

      socket.broadcast.emit('someone posts stamp', data);
    });

    socket.on('post my text', (data) => {
      /**
       * data = {
       *   to: {
       *     name : '返信相手の名前'
       *     icon: '返信相手のアイコンのパス',
       *   },
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   text: '返信内容のテキスト'
       * };
       *
       * または
       * data = {
       *   to: '',
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   text: '返信内容のテキスト'
       * };
       */

      socket.broadcast.emit('someone posts text', data);
    });

    socket.on('onload main page', (data) => {
      if (!npcExists) {
        const secondsForNpcToChooseMenu = Math.floor(Math.random() * 4) + 2;
        npcExists = true;
        setTimeout(() => {
          npcExists = false;
        }, (75 + secondsForNpcToChooseMenu) * 1000);

        const getRandomIndex = (array) => Math.floor(Math.random() * array.length);

        let indexOfNpc = getRandomIndex(npcs);
        while (indexOfNpc === indexOfPreviousNpc) {
          indexOfNpc = getRandomIndex(npcs);
        }

        npc = npcs[indexOfNpc];
        indexOfPreviousNpc = indexOfNpc;

        const emitData = {
          to: '',
          from: {
            name: npc.name,
            icon: npc.icon,
          },
          src: data.menusSrc[getRandomIndex(data.menusSrc)],
        };

        setTimeout(() => {
          rootIo.emit('someone posts menu', emitData);
          setCoolDown(60);

          emitData.src = 'images/stamps/1-min.jpg';

          setTimeout(() => {
            rootIo.emit('someone posts stamp', emitData);
          }, 60000);
        }, secondsForNpcToChooseMenu * 1000);
      }
    });

    socket.on('call npc', (data) => {
      if (coolDown || !npcExists) {
        return;
      }

      setCoolDown(5);

      if (Math.random() < 0.1) {
        return;
      }

      let responsePostType; // 'stamp' or 'text'

      const responseTimeLag = Math.floor((Math.random() * 3 + 1) * 1000);

      const emitData = {
        to: '',
        from: {
          name: npc.name,
          icon: npc.icon,
        },
        // and
        // src: 'スタンプ画像のurl'
        // or
        // text: '返信内容のテキスト'
      };

      if (Math.random() < 0.5) {
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
        rootIo.emit(`someone posts ${responsePostType}`, emitData);
      }, responseTimeLag);
    });
  });
}

module.exports = {
  createWebSocketServer,
};

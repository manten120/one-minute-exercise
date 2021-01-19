const { stampsData } = require('../utility/stamps');
const { textsData } = require('../utility/texts');

function createWebSocketServer(io) {
  const rootIo = io.of('/');
  rootIo.on('connection', (socket) => {
    console.log('WebSocket のコネクションがありました。');

    // 同時接続者数(ただしトップページ閲覧者も含む)
    console.log('client count: ', rootIo.sockets.size);

    socket.emit('start data', {});

    socket.on('disconnect', () => {});

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

      socket.broadcast.emit('some one posts text', data);
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

      socket.broadcast.emit('some one posts stamp', data);
    });

    socket.on('call npc', (data) => {
      if (Math.random() < 0.1) {
        return;
      }

      let responsePostType; // 'stamp' or 'text'

      const responseTimeLag = Math.floor((Math.random() * 3 + 1) * 1000);

      const emitData = {
        to: '',
        from: {
          name: 'NPC',
          icon: 'images/icons/gorilla1.jpg',
        },
        // and
        // src: 'スタンプ画像のurl'
        // or
        // text: '返信内容のテキスト'
      };

      if (Math.random() < 0.3) {
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
        socket.emit(`some one posts ${responsePostType}`, emitData);
      }, responseTimeLag);
    });
  });
}

module.exports = {
  createWebSocketServer,
};

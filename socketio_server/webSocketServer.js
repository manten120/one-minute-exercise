const { stampsData } = require('../utility/stamps');
// const { textsData } = require('../utility/texts');
const { Npc } = require('../utility/npcs');

let npc = new Npc();

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
      if (!Number.isInteger(data.key) || stampsData[data.key]) {
        console.log('不正な値です');
        return;
      }
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
       *   key: 'stampsDataオブジェクトのキー'
       * };
       *
       * または
       * data = {
       *   to: '',
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   key: 'stampsDataオブジェクトのキー'
       * };
       */
      const emitData = {
        to: data.to,
        from: data.from,
        src: stampsData['100'].src,
      };

      socket.broadcast.emit('someone posts stamp', emitData);
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
      if (!npc.isAlive) {
        npc = new Npc(npc.index);
        npc.postMenu(rootIo, data.randomMenusSrc);
      } else if (npc.canPostMenu) {
        npc.postMenu(rootIo, data.randomMenusSrc);
      }
    });

    socket.on('call npc', (data) => {
      npc.response(rootIo, data);
    });
  });
}

module.exports = {
  createWebSocketServer,
};

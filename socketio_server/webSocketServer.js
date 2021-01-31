/* eslint-disable no-console */
const { menusKeyAndSrcPairs } = require('../utility/menus');
const { stampsData } = require('../utility/stamps');
const { textsData } = require('../utility/texts');
const { Npc } = require('../utility/npcs');

let npc = new Npc();

function createWebSocketServer(io) {
  const rootIo = io.of('/');
  rootIo.on('connection', (socket) => {
    socket.on('post my menu', (data) => {
      if (!Number.isInteger(data.key)) {
        console.log('不正な値です');
        return;
      }
      /**
       * data = {
       *   to: '',
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   key: '配列menusKeyAndSrcPairsの要素のkeyプロパティの値'
       * };
       */
      const keyAndSrcPair = menusKeyAndSrcPairs.find((pair) => pair.key === data.key);

      if (!keyAndSrcPair) {
        console.log('不正な値です');
        return;
      }

      const emitData = {
        to: '',
        from: data.from,
        src: keyAndSrcPair.src,
      };
      socket.broadcast.emit('someone posts menu', emitData);
    });

    socket.on('post my stamp', (data) => {
      if (!Number.isInteger(data.key) || !stampsData[data.key]) {
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
        src: stampsData[data.key].src,
      };

      socket.broadcast.emit('someone posts stamp', emitData);
    });

    socket.on('post my text', (data) => {
      if (!Number.isInteger(data.key) || !textsData[data.key]) {
        console.log('不正な値です!');
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
       *     icon: '送り主(自分)のアイコンのパス',s
       *   },
       *   key: 'textsDataオブジェクトのキー'
       * };
       *
       * または
       * data = {
       *   to: '',
       *   from : {
       *     name : '送り(自分)の名前'
       *     icon: '送り主(自分)のアイコンのパス',
       *   },
       *   key: 'textsDataオブジェクトのキー'
       * };
       */

      const emitData = {
        to: data.to,
        from: data.from,
        text: textsData[data.key].text,
      };
      socket.broadcast.emit('someone posts text', emitData);
    });

    socket.on('call npc on loading main page', (data) => {
      if (!npc.isAlive) {
        npc = new Npc(npc.index);
        npc.postMenu(rootIo, data.randomMenus);
      } else if (npc.canPostMenu) {
        npc.postMenu(rootIo, data.randomMenus);
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

function createWebSocketServer(io) {
  const rootIo = io.of('/');
  rootIo.on('connection', (socket) => {
    console.log('WebSocket のコネクションがありました。');

    socket.emit('start data', {});

    socket.on('disconnect', () => {});

    socket.on('post my text', (data) => {
      /**
       * data = {
       *   to: {
       *     id: '返信相手のid',
       *     name : '返信相手の名前'
       *   },
       *   from : {
       *     id: '送り主(自分)のid',
       *     name : '送り(自分)の名前'
       *   },
       *   text: '返信内容のテキスト'
       * };
       *
       * または
       * data = {
       *   to: '',
       *   from : '',
       *   text: '返信内容のテキスト'
       * };
       */

      const emitData = {
        mention: '',
        text: data.text,
      };

      if (data.to) {
        emitData.mention = data.to.name;
      }

      socket.broadcast.emit('some one posts text', emitData);
    });

    socket.on('post my stamp', (data) => {
      /**
       * data = {
       *   to: {
       *     id: '返信相手のid',
       *     name : '返信相手の名前'
       *   },
       *   from : {
       *     id: '送り主(自分)のid',
       *     name : '送り(自分)の名前'
       *   },
       *   src: 'スタンプ画像のurl'
       * };
       *
       * または
       * data = {
       *   to: '',
       *   from : '',
       *   src: 'スタンプ画像のurl'
       * };
       */

      const emitData = {
        mention: '',
        src: data.src,
      };

      if (data.to) {
        emitData.mention = data.to.name;
      }

      socket.broadcast.emit('some one posts stamp', emitData);
    });
  });
}

module.exports = {
  createWebSocketServer,
};

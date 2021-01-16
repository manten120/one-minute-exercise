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
  });
}

module.exports = {
  createWebSocketServer,
};

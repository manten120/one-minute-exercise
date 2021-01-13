function createWebSocketServer(io) {
  const rootIo = io.of('/');
  rootIo.on('connection', (socket) => {
    console.log('WebSocket のコネクションがありました。');

    socket.emit('start data', {});

    socket.on('disconnect', () => {});

    socket.on('post text', (data) => {
      console.log('post text: ', data.text);
    });
  });
}

module.exports = {
  createWebSocketServer,
};

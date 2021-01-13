function createWebSocketServer(io) {
  const rootIo = io.of('/');
  rootIo.on('connection', (socket) => {
    console.log('WebSocket のコネクションがありました。');

    socket.emit('start data', {});

    socket.on('disconnect', () => {});

    socket.on('post my text', (data) => {
      socket.broadcast.emit('some one posts text', { text: data.text });
    });

    socket.on('post my stamp', (data) => {
      socket.broadcast.emit('some one posts stamp', { src: data.src });
    });
  });
}

module.exports = {
  createWebSocketServer,
};

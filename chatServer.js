const { Message } = require('./models/Message');

exports.chatServer = (io) => {
  io.on('connection', (socket) => {
    socket.on('chat message', function (msg) {
      Message.create({
        content: msg.message,
        sender: msg.sender,
        receiver: msg.receiver,
        chatId: msg.chatId,
      });
    });
  });
};

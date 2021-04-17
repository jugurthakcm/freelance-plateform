const { Message } = require('./models/Message');
const { Chat } = require('./models/Chat');

exports.chatServer = (io) => {
  io.use((socket, next) => {
    const { userId } = socket.handshake.auth;
    if (!userId) {
      return next(new Error('invalid user or chat'));
    }

    socket.userId = userId;
    // socket.chatId = chatId;
    next();
  });

  io.on('connection', (socket) => {
    let users = [];
    //List connected users
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        id,
        userId: socket.userId,
      });
    }
    socket.emit('users', users);

    socket.broadcast.emit('user connected', {
      id: socket.id,
      userId: socket.userId,
    });

    //Emit an event when private msg sended
    socket.on('private message', function (msg) {
      const { message, sender, receiver, chatId, to } = msg;
      if (to) {
        socket.to(to).emit('private message', {
          content: message,
          from: socket.id,
        });
        Message.create({
          content: message,
          sender: sender,
          receiver: receiver,
          chatId: chatId,
        })
          .then(() =>
            Chat.findByIdAndUpdate(chatId, {
              lastModified: new Date(),
            })
              .then(() => console.log('message added'))
              .catch((err) => console.error(err))
          )
          .catch((err) => console.error(err));
      } else {
        Message.create({
          content: message,
          sender: sender,
          receiver: receiver,
          chatId: chatId,
        })
          .then(() =>
            Chat.findByIdAndUpdate(chatId, {
              lastModified: new Date(),
            })
              .then(() => console.log('message added'))
              .catch((err) => console.error(err))
          )
          .catch((err) => console.error(err));
      }
    });
  });
};

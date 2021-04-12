const express = require('express');
const app = express();
const mongoose = require('mongoose');
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const chatRoutes = require('./routes/chatRoutes');

app.use(express.json());
app.use(cors());
app.use('/chat', chatRoutes);

const mongoURI =
  process.env.NODE_ENV === 'developement'
    ? process.env.MONGO_LOCALHOST
    : process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(5000, () => {
  console.log('listening on 5000');
});

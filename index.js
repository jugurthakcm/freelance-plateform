require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const gigRoutes = require('./routes/gigRoutes');
const requestRoutes = require('./routes/requestRoutes');
const commentRoutes = require('./routes/commentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const emailRoutes = require('./routes/emailRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
// const { Category } = require('./models/Category');
const path = require('path');

//Configure socket.io SERVER
const http = require('http');
const { chatServer } = require('./chatServer');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/messages', messageRoutes);
app.use('/', emailRoutes);

/*const arr = [
  'programmation & tech',
  'digital marketing',
  'photography',
  'translation & writing',
  'voice',
  'graphic design',
  'video motion',
  'architecture',
];

 app.get('/addCategories', async (req, res) => {
  const addData = await arr.map((e) => Category.create({ title: e }));
  res.send('Data added');
}); */

const mongoURI =
  process.env.NODE_ENV === 'developement'
    ? process.env.MONGO_LOCALHOST
    : process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello world'));

chatServer(io);

server.listen(PORT, () => console.log('Listening to ' + PORT));

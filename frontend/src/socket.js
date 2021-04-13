import { io } from 'socket.io-client';
import api from './api';

const socket = io(api, { autoConnect: false });

socket.onAny((event, ...args) => {
  console.log(event, args);
});

export default socket;

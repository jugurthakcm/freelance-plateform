import React, { useState, useEffect, useContext } from 'react';
import avatar from '../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getChat } from '../data/actions/chatActions';
import { useHistory } from 'react-router-dom';

import { getMessages } from '../data/actions/messageActions';
// import { io } from 'socket.io-client';
// import api from '../api';
import { useSocketContext } from '../ContextAPI/SocketProvider';

const Chat = (props) => {
  const socket = useSocketContext();

  const { id } = props.match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const messages = useSelector((state) => state.message);
  const [participant, setParticipant] = useState({});
  const [users, setUsers] = useState([]);

  const userId = user?.user?._id;

  //Scroll to last messages in chat
  useEffect(() => {
    const message = document.querySelector('.chat__messageBody');
    window.onload = function () {
      message.scrollTop = message.scrollHeight;
    };
    message.scrollTop = message.scrollHeight;
  }, []);

  //Get chat instance from database
  useEffect(() => {
    if (!user.token) history.push('/login');

    user.token && dispatch(getChat(id, user.token));
  }, [dispatch, user, id, history]);

  //Associate the participant
  useEffect(() => {
    const participant1 = chat?.chat?.participant1;
    const participant2 = chat?.chat?.participant2;

    if (userId && participant1 && userId !== participant1.id) {
      setParticipant({ name: participant1.name, id: participant1.id });
    } else if (userId && participant2 && userId !== participant2.id) {
      setParticipant({ name: participant2.name, id: participant2.id });
    }
  }, [userId, chat]);

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    socket.emit('private message', {
      message,
      chatId: id,
      sender: userId,
      receiver: participant.id,
      to: users[users.length - 1]?.id || null,
    });

    const a = document.getElementsByClassName('chat__messageBody')[0];
    const b = document.createElement('div');
    b.classList.add('chat__messageReceiver');
    const c = document.createElement('div');
    c.innerText = message;
    c.classList.add('chat__receiverText');
    b.appendChild(c);
    a.appendChild(b);
    a.scrollTop = a.scrollHeight;
    setMessage('');
  };

  //Get messages from database
  useEffect(() => {
    user.token && dispatch(getMessages(id, user.token));
  }, [user, id, dispatch]);

  // Configure socket.io
  useEffect(() => {
    socket.auth = userId && { userId };
    socket.connect();

    //Check if error while logging user
    socket.on('connect_error', (err) => {
      if (err.message === 'invalid user') {
        console.log(err.message);
      }
    });

    socket.on('users', (users) => {
      users && setUsers(users.filter((u) => u.id !== socket.id));
    });

    socket.on('user connected', (user) => {
      setUsers([...users, user]);
    });

    //display sent message
    socket.on('private message', (message) => {
      const a = document.getElementsByClassName('chat__messageBody')[0];

      const b = document.createElement('div');
      b.classList.add('chat__messageSender');
      const c = document.createElement('div');
      c.innerText = message.content;
      c.classList.add('chat__senderText');
      b.appendChild(c);
      a.appendChild(b);
      a.scrollTop = a.scrollHeight;
    });
    return () => {
      socket.off('private message');
    };
  }, [userId, users, socket]);

  return (
    <div className="chatPage">
      <Navbar />
      <div className="container">
        <div className="chat row p-4">
          {/* <div className="chat__aside col-4">
            <h2>Chat</h2>
            <div className="chat__contacts">
              <div className="chat__contact">
                <div className="chat__contactImage">
                  <img src={avatar} alt="avatar" />
                </div>
                <div className="chat__contactNameMessage">
                  <strong>KACIMI Jugurtha</strong>
                  <p>This my last message</p>
                </div>
                <div className="chat__contactOption">
                  
                </div>
              </div>
            </div>
          </div> */}

          <div className="chat__messages col-12">
            <div className="chat__messageHeader">
              <div className="chat__contactImage">
                <img src={avatar} alt="avatar" width="50px" />
              </div>
              <div className="chat__contactNameMessage">
                <strong>{participant && participant.name}</strong>
              </div>
            </div>
            <div className="chat__messageBody">
              {messages?.messages?.map((message) => {
                if (message.sender === userId) {
                  return (
                    <div className="chat__messageReceiver" key={message._id}>
                      {/* <div className="chat__receivermage">
                        <img
                          src={avatar}
                          alt="avatar"
                          width="25px"
                          className="chat__messageAvatar"
                        />
                      </div> */}
                      <div className="chat__receiverText">
                        {message.content}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="chat__messageSender" key={message._id}>
                      {/* <div className="chat__senderImage">
                        <img
                          src={avatar}
                          alt="avatar"
                          width="25px"
                          className="chat__messageAvatar"
                        />
                      </div> */}
                      <div className="chat__senderText">{message.content}</div>
                    </div>
                  );
                }
              })}
            </div>
            <form className="chat__messageInput" onSubmit={handleSubmit}>
              <input
                type="text"
                name="message"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

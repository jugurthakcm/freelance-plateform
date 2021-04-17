import React, { useState, useEffect, useContext } from 'react';
import avatar from '../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisV,
  faPaperPlane,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { getChat, getMyChats } from '../data/actions/chatActions';
import { Link, useHistory } from 'react-router-dom';

import { getMessages } from '../data/actions/messageActions';
// import { io } from 'socket.io-client';
// import api from '../api';
import { useSocketContext } from '../ContextAPI/SocketProvider';
import axios from '../axios';
import api from '../api';
import { getUserFromId } from '../util';

const Chat = (props) => {
  const socket = useSocketContext();

  const { id } = props.match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const messages = useSelector((state) => state.message);
  const [participant, setParticipant] = useState();
  const [users, setUsers] = useState([]);

  const userId = user?.user?._id;

  //Scroll to last messages in chat
  useEffect(() => {
    const message = document.querySelector('.chat__messageBody');
    window.onload = function () {
      message.scrollTop = message.scrollHeight;
    };
    message.scrollTop = message.scrollHeight;
  }, [messages]);

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
      setParticipant({ id: participant1.id });
    } else if (userId && participant2 && userId !== participant2.id) {
      setParticipant({ id: participant2.id });
    }
  }, [userId, chat]);

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const receiverId = participant._id || participant.id;

    const arr = users.filter((e) => e.userId === receiverId);

    socket.emit('private message', {
      message,
      chatId: id,
      sender: userId,
      receiver: participant._id || participant.id,
      to: arr[0]?.id || null,
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

  useEffect(() => {
    user.token &&
      participant?.id &&
      axios
        .get('/user/' + participant.id)
        .then((res) => {
          const user = res.data.user;
          if (user) setParticipant(user);
        })
        .catch((err) => console.error(err));
  }, [user, participant]);

  useEffect(() => {
    user.token && dispatch(getMyChats(user.token));
  }, [user, dispatch]);

  useEffect(() => {}, []);

  return (
    <div className="chatPage">
      <Navbar />
      <div className="container-lg">
        <div className="chat row p-4">
          <div className="chat__bar col-md-4 d-md-none d-flex">
            {chat?.myChats?.map((e) => (
              <Link
                className="chat__contacts"
                key={e._id}
                to={`/chat/${e._id}`}
                onClick={() => (window.location.href = `/chat/${e._id}`)}
              >
                <div className="chat__contact">
                  <div className="chat__contactImage">
                    {(userId === e.participant1.id &&
                    e.participant2.imageURI ? (
                      <img
                        src={`${api}/uploads/avatars/${e.participant2.imageURI}`}
                        alt="avatar"
                        width="50px"
                      />
                    ) : (
                      <img src={avatar} alt="avatar" width="50px" />
                    )) ||
                      (userId === e.participant2.id &&
                      e.participant1.imageURI ? (
                        <img
                          src={`${api}/uploads/avatars/${e.participant1.imageURI}`}
                          alt="avatar"
                          width="50px"
                        />
                      ) : (
                        <img src={avatar} alt="avatar" width="50px" />
                      ))}
                  </div>

                  <div className="chat__contactNameMessage">
                    <h6>
                      {(userId === e.participant1.id && e.participant2.name) ||
                        (userId === e.participant2.id && e.participant1.name)}
                    </h6>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="chat__aside col-md-4 d-none d-md-block">
            <h2>Chat</h2>
            {chat?.myChats?.map((e) => (
              <Link
                className="chat__contacts"
                key={e._id}
                to={`/chat/${e._id}`}
                onClick={() => (window.location.href = `/chat/${e._id}`)}
              >
                <div className="chat__contact">
                  <div className="d-flex align-items-center">
                    <div className="chat__contactImage me-3">
                      {(userId === e.participant1.id &&
                      e.participant2.imageURI ? (
                        <img
                          src={`${api}/uploads/avatars/${e.participant2.imageURI}`}
                          alt="avatar"
                          width="50px"
                        />
                      ) : (
                        <img src={avatar} alt="avatar" width="50px" />
                      )) ||
                        (userId === e.participant2.id &&
                        e.participant1.imageURI ? (
                          <img
                            src={`${api}/uploads/avatars/${e.participant1.imageURI}`}
                            alt="avatar"
                            width="50px"
                          />
                        ) : (
                          <img src={avatar} alt="avatar" width="50px" />
                        ))}
                    </div>

                    <div className="chat__contactNameMessage">
                      <h6 className="mb-0">
                        {(userId === e.participant1.id &&
                          e.participant2.name) ||
                          (userId === e.participant2.id && e.participant1.name)}
                      </h6>

                      <p>Last Message</p>
                    </div>
                  </div>

                  <div className="chat__contactDelete">
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="chat__messages col-md-8">
            <div className="chat__messageHeader">
              <div className="chat__contactImage">
                {participant?.imageURI ? (
                  <img
                    src={`${api}/uploads/avatars/${participant.imageURI}`}
                    alt="avatar"
                    width="50px"
                  />
                ) : (
                  <img src={avatar} alt="avatar" width="50px" />
                )}
              </div>
              <div className="chat__contactNameMessage ms-3">
                <strong>
                  {participant?.firstName &&
                    participant?.lastName &&
                    participant.firstName + ' ' + participant.lastName}
                </strong>
              </div>
            </div>
            <div className="chat__messageBody mt-3">
              {messages?.messages?.map((message) => {
                if (message.sender === userId && message.chatId === id) {
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
                } else if (message.sender !== userId && message.chatId === id) {
                  return (
                    <div className="chat__messageSender" key={message._id}>
                      {/* <div className="chat__senderImage">
                        {participant?.imageURI ? (
                          <img
                            src={`${api}/uploads/avatars/${participant.imageURI}`}
                            alt="avatar"
                            width="25px"
                            className="chat__messageAvatar"
                          />
                        ) : (
                          <img
                            src={avatar}
                            alt="avatar"
                            width="25px"
                            className="chat__messageAvatar"
                          />
                        )}
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

import React, { useState, useEffect } from 'react';
import avatar from '../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Navbar from './Navbar';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { getChat } from '../data/actions/chatActions';
import { useHistory } from 'react-router-dom';
import api from '../api';
import { getMessages } from '../data/actions/messageActions';

const Chat = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const messages = useSelector((state) => state.message);
  const [participant, setParticipant] = useState({});

  const userId = user?.user?._id;

  let socket = io(api);

  useEffect(() => {
    const message = document.querySelector('.chat__messageBody');
    window.onload = function () {
      message.scrollTop = message.scrollHeight;
    };
    message.scrollTop = message.scrollHeight;
  }, []);

  useEffect(() => {
    if (!user.token) history.push('/login');

    user.token && dispatch(getChat(id, user.token));
  }, [dispatch, user, id, history]);

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
    socket.emit('chat message', {
      message,
      chatId: id,
      sender: userId,
      receiver: participant.id,
    });
    setMessage('');
  };

  useEffect(() => {
    user.token && dispatch(getMessages(id, user.token));
  }, [user, id, dispatch]);

  return (
    <div className="chatPage">
      <Navbar />
      <div className="container">
        <div className="chat row p-4">
          <div className="chat__aside col-4">
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
                  {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
                </div>
              </div>
            </div>
          </div>

          <div className="chat__messages col-8">
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
                    <div className="chat__messageReceiver">
                      <div className="chat__receivermage">
                        <img
                          src={avatar}
                          alt="avatar"
                          width="25px"
                          className="chat__messageAvatar"
                        />
                      </div>
                      <div className="chat__receiverText">
                        {message.content}
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="chat__messageSender">
                      <div className="chat__senderImage">
                        <img
                          src={avatar}
                          alt="avatar"
                          width="25px"
                          className="chat__messageAvatar"
                        />
                      </div>
                      <div className="chat__senderText">{message.content}</div>
                    </div>
                  );
                }
              })}
              {/* <div className="chat__messageSender">
                <div className="chat__senderImage">
                  <img
                    src={avatar}
                    alt="avatar"
                    width="25px"
                    className="chat__messageAvatar"
                  />
                </div>
                <div className="chat__senderText">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, ullam repudiandae neque beatae eveniet iure.
                  Dolor quasi repellat molestiae dolores.
                </div>
              </div>

              <div className="chat__messageReceiver">
                <div className="chat__receiverImage">
                  <img
                    src={avatar}
                    alt="avatar"
                    width="25px"
                    className="chat__messageAvatar"
                  />
                </div>
                <div className="chat__receiverText">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, ullam repudiandae neque beatae eveniet iure.
                  Dolor quasi repellat molestiae dolores.
                </div>
              </div>
              <div className="chat__messageSender">
                <div className="chat__senderImage">
                  <img
                    src={avatar}
                    alt="avatar"
                    width="25px"
                    className="chat__messageAvatar"
                  />
                </div>
                <div className="chat__senderText">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, ullam repudiandae neque beatae eveniet iure.
                  Dolor quasi repellat molestiae dolores.
                </div>
              </div>

              <div className="chat__messageReceiver">
                <div className="chat__receiverImage">
                  <img
                    src={avatar}
                    alt="avatar"
                    width="25px"
                    className="chat__messageAvatar"
                  />
                </div>
                <div className="chat__receiverText">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, ullam repudiandae neque beatae eveniet iure.
                  Dolor quasi repellat molestiae dolores.
                </div>
              </div>
              <div className="chat__messageSender">
                <div className="chat__senderImage">
                  <img
                    src={avatar}
                    alt="avatar"
                    width="25px"
                    className="chat__messageAvatar"
                  />
                </div>
                <div className="chat__senderText">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, ullam repudiandae neque beatae eveniet iure.
                  Dolor quasi repellat molestiae dolores.
                </div>
              </div>

              <div className="chat__messageReceiver">
                <div className="chat__receiverImage">
                  <img
                    src={avatar}
                    alt="avatar"
                    width="25px"
                    className="chat__messageAvatar"
                  />
                </div>
                <div className="chat__receiverText">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Reprehenderit, ullam repudiandae neque beatae eveniet iure.
                  Dolor quasi repellat molestiae dolores.
                </div>
              </div> */}
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

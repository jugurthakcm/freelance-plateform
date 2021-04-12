import React, { useState, useEffect } from 'react';
import avatar from '../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Navbar from './Navbar';
import io from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { getChat } from '../data/actions/chatActions';
import { useHistory } from 'react-router-dom';

const Chat = (props) => {
  const { id } = props.match.params;
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const [participant, setParticipant] = useState();

  let socket = io();

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
    const userId = user && user.user && user.user._id;
    const participant1 = chat && chat.chat && chat.chat.participant1;
    const participant2 = chat && chat.chat && chat.chat.participant2;

    if (userId && participant1 && userId !== participant1.id) {
      setParticipant(participant1.name);
    } else if (userId && participant2 && userId !== participant2.id) {
      setParticipant(participant2.name);
    }
  }, [user, chat]);

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
                <div className="chat__contactOptions">
                  <FontAwesomeIcon icon={faEllipsisV} />
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
                <strong>{participant && participant}</strong>
              </div>
            </div>
            <div className="chat__messageBody">
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
            </div>
            <div className="chat__messageInput">
              <input
                type="text"
                name="message"
                placeholder="Type your message here..."
              />
              <button>
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;

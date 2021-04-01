import React, { useEffect } from 'react';
import avatar from '../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Navbar from './Navbar';

const Chat = () => {
  useEffect(() => {
    window.onload = function () {
      const message = document.querySelector('.chat__messageBody');
      message.scrollTop = message.scrollHeight;
    };
  }, []);

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
                <strong>KACIMI Jugurtha</strong>
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

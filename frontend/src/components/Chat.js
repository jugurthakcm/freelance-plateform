import React, { useState, useEffect } from 'react';
import avatar from '../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Chat.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Chat = (props) => {
  //Scroll to last messages in chat
  useEffect(() => {
    const message = document.querySelector('.chat__messageBody');
    window.onload = function () {
      message.scrollTop = message.scrollHeight;
    };
    message.scrollTop = message.scrollHeight;
  }, []);

  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

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

  return (
    <div className="chatPage">
      <Navbar />
      <div className="container-lg">
        <div className="chat row p-4">
          <div className="chat__bar col-md-4 d-md-none d-flex">
            <Link to={`/chat`}>
              <div className="chat__contact">
                <div className="chat__contactImage">
                  <img src={avatar} alt="avatar" width="50px" />
                </div>

                <div className="chat__contactNameMessage">
                  <h6>Contact</h6>
                </div>
              </div>
            </Link>
          </div>
          <div className="chat__aside col-md-4 d-none d-md-block">
            <h2>Chat</h2>
            <div className="chat__contacts">
              <Link to={`/chat`}>
                <div className="chat__contact">
                  <div className="d-flex align-items-center">
                    <div className="chat__contactImage me-3">
                      <img src={avatar} alt="avatar" width="50px" />
                    </div>

                    <div className="chat__contactNameMessage">
                      <h6 className="mb-0">Contact name</h6>
                      <p>Last Message</p>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="chat__contactDelete">
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          </div>

          <div className="chat__messages col-md-8">
            <div className="chat__messageHeader">
              <div className="chat__contactImage">
                <img src={avatar} alt="avatar" width="50px" />
              </div>
              <div className="chat__contactNameMessage ms-3">
                <strong>Participant Name</strong>
              </div>
            </div>
            <div className="chat__messageBody mt-3">
              <div className="chat__messageReceiver" key={message._id}>
                <div className="chat__receiverText">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. At,
                  magnam!
                </div>
              </div>

              <div className="chat__messageSender">
                <div className="chat__senderText">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Deserunt, odit!
                </div>
              </div>
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

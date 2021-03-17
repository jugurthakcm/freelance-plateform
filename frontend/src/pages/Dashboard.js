import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import avatar from '../assets/images/avatar.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faMapMarkerAlt,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import EditLanguage from '../components/dashboardModals/EditLanguage';
import AddLanguage from '../components/dashboardModals/AddLanguage';

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.token) history.push('/login');
  }, [user, history]);

  return (
    <>
      <Navbar />
      <div className="dashboard container">
        <div className="dashboard__user">
          <div className="user__image">
            <img src={avatar} alt="avatar" width="100px" />
          </div>

          <div className="user__info">
            <h4>KACIMI Jugurtha</h4>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" /> Tizi
              Ouzou, Algeria
            </p>
          </div>
        </div>

        <div className="dashboard__main mt-5 row">
          <div className="dashboard__sidebar col-md-4">
            <div className="dashboard__section sidebar__languages">
              <div className="dashboard__title languages__title">
                <h5>Languages</h5>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#addLanguagesModal"
                >
                  <FontAwesomeIcon icon={faPlus} className="ml-3" />
                </button>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#languagesModal"
                >
                  <FontAwesomeIcon icon={faPen} className="ml-3" />
                </button>
                <AddLanguage />
                <EditLanguage />
              </div>

              <ul>
                <li>
                  English : <span>Fluent</span>
                </li>
                <li>
                  French : <span>Fluent</span>
                </li>
              </ul>
            </div>

            <div className="dashboard__section sidebar__education">
              <div className="dashboard__title education__title">
                <h5>Education</h5>
                <button>
                  <FontAwesomeIcon icon={faPen} className="ml-3" />
                </button>
              </div>
              <h6 className="education__school">Université</h6>
              <p className="education__details">
                School degree, <br />
                Speciality computer science
              </p>
              <p className="education__year">2016-2021</p>
            </div>
          </div>

          <div className="dashboard__right col-md-8">
            <div className="dashboard__presentation">
              <div className="dashboard__section presentation__header">
                <div className="dashboard__title presentation__title">
                  <h4>Title</h4>
                  <FontAwesomeIcon icon={faPen} className="ml-3 mt-1" />
                </div>
                {/* <div className="dashboard__title presentation__hourlyRate">
                  <h5>200 DA/hr</h5>
                  <button>
                    <FontAwesomeIcon icon={faPen} className="ml-3" />
                  </button>
                </div> */}
              </div>

              <div className="dashboard__section presentation__bio">
                <div className="dashboard__title presentation__bioTitle">
                  <h5>Description</h5>
                  <button>
                    <FontAwesomeIcon icon={faPen} className="ml-3" />
                  </button>
                </div>

                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea
                  beatae hic fuga ipsa non earum sed repudiandae atque ab
                  voluptatum?
                </p>
              </div>
            </div>

            <div className="dashboard__section presentation__skills">
              <div className="dashboard__title skills__title">
                <h5>Skills</h5>
                <button>
                  <FontAwesomeIcon icon={faPen} className="ml-3" />
                </button>
              </div>
              <ul>
                <li>Mongodb</li>
                <li>Nodejs</li>
                <li>React.js</li>
              </ul>
            </div>
            <div className="dashboard__section dashboard__gigs"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

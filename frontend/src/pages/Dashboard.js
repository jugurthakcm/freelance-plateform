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
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import EditLanguage from '../components/dashboardModals/EditLanguage';
import AddLanguage from '../components/dashboardModals/AddLanguage';
import Education from '../components/dashboardModals/Education';
import EditTitle from '../components/dashboardModals/EditTitle';
import EditBio from '../components/dashboardModals/EditBio';

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const u = user.user;

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
            <h4>{u && u.firstName + ' ' + u.lastName}</h4>
            <p>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-1" />
              {u && u.location ? u.location : 'No location added'}
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
                {u && u.languages.length ? (
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#languagesModal"
                  >
                    <FontAwesomeIcon icon={faPen} className="ml-3" />
                  </button>
                ) : null}

                <AddLanguage />
                <EditLanguage />
              </div>

              <ul>
                {u && u.languages.length
                  ? u.languages.map((lang) => (
                      <li>
                        {lang.lang} : <span>{lang.level}</span>
                      </li>
                    ))
                  : null}
                {/* <li>
                  English : <span>Fluent</span>
                </li>
                <li>
                  French : <span>Fluent</span>
                </li> */}
              </ul>
            </div>

            <div className="dashboard__section sidebar__education">
              <div className="dashboard__title education__title">
                <h5>Education</h5>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#EducationModal"
                >
                  <FontAwesomeIcon icon={faPlus} className="ml-3" />
                </button>
                <Education />
              </div>
              {u && u.education.length ? (
                <>
                  <div className="education__school d-flex align-items-start justify-content-between">
                    <h6 className="education__school">Université</h6>
                    <div>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#EducationModal"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button>
                        <FontAwesomeIcon icon={faTrash} className="ml-3 mr-5" />
                      </button>
                    </div>
                  </div>

                  <p className="education__details">
                    School degree, <br />
                    Speciality computer science
                  </p>
                  <p className="education__year">2016-2021</p>
                </>
              ) : null}
            </div>
          </div>

          <div className="dashboard__right col-md-8">
            <div className="dashboard__presentation">
              <div className="dashboard__section presentation__header">
                {u && u.title ? (
                  <div className="dashboard__title presentation__title">
                    <h4>{u.title}</h4>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editTitleModal"
                    >
                      <FontAwesomeIcon icon={faPen} className="ml-3 mt-1" />
                    </button>
                    <EditTitle />
                  </div>
                ) : null}

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
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editBioModal"
                  >
                    <FontAwesomeIcon icon={faPen} className="ml-3" />
                  </button>
                  <EditBio />
                </div>
                {u && u.bio ? <p>{u.bio}</p> : null}
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

import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import avatar from '../assets/images/avatar.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faMapMarkerAlt,
  faPlus,
  faTrash,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import EditLanguage from '../components/dashboardModals/EditLanguage';
import AddLanguage from '../components/dashboardModals/AddLanguage';
import Education from '../components/dashboardModals/Education';
import EditTitle from '../components/dashboardModals/EditTitle';
import EditBio from '../components/dashboardModals/EditBio';
import { deleteEducation } from '../data/actions/userActions';
import EditEducation from '../components/dashboardModals/EditEducation';
import { sortEducation } from '../util';
import EditSkills from '../components/dashboardModals/EditSkills';

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const u = user.user;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.token) history.push('/login');
  }, [user, history]);

  return (
    <>
      <Navbar />
      {u && !u.confirmedEmail && (
        <div
          className="alert alert-danger dashboard__confirmEmail container"
          role="alert"
          style={{ marginBottom: '-50px' }}
        >
          A confirmation email was sent to your adress mail, please confirm your
          registration.
        </div>
      )}

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
                {u && u.languages.length ? (
                  u.languages.map((lang) => (
                    <li key={lang.id}>
                      {lang.language} : <span>{lang.level}</span>
                    </li>
                  ))
                ) : (
                  <div className="dashboard__completeProfile">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mr-2"
                    />
                    Add your languages to complete your profile
                  </div>
                )}
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
                u.education.sort(sortEducation).map((e) => (
                  <div key={e.id} className="mb-2">
                    <div className="education__school d-flex align-items-start justify-content-between">
                      <h6 className="education__school">{e.school}</h6>
                      <div>
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#EditEducationModal"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                        <button>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className="ml-3 mr-5"
                            onClick={() =>
                              dispatch(deleteEducation(e.id, user.token))
                            }
                          />
                        </button>
                      </div>
                    </div>

                    <EditEducation data={e} />

                    <p className="education__details">
                      {e.degree}, <br />
                      {e.areaOfStudy}
                    </p>
                    <p className="education__year">
                      {e.yearStart}-{e.yearEnd}
                    </p>
                  </div>
                ))
              ) : (
                <div className="dashboard__completeProfile">
                  <FontAwesomeIcon
                    icon={faExclamationCircle}
                    className="mr-2"
                  />
                  Add your education to complete your profile
                </div>
              )}
            </div>
          </div>

          <div className="dashboard__right col-md-8">
            <div className="dashboard__presentation">
              <div className="dashboard__section presentation__header">
                <div className="dashboard__title presentation__title">
                  {u && u.title ? <h4>{u.title}</h4> : <h4>Add your title</h4>}
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editTitleModal"
                  >
                    <FontAwesomeIcon icon={faPen} className="ml-3 mt-2" />
                  </button>
                  <EditTitle />
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
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#editBioModal"
                  >
                    <FontAwesomeIcon icon={faPen} className="ml-3" />
                  </button>
                  <EditBio />
                </div>
                {u && u.bio ? (
                  <p>{u.bio}</p>
                ) : (
                  <div className="dashboard__completeProfile">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mr-2"
                    />
                    Add your description to complete your profile
                  </div>
                )}
              </div>
            </div>

            <div className="dashboard__section presentation__skills">
              <div className="dashboard__title skills__title">
                <h5>Skills</h5>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#editSkillsModal"
                >
                  <FontAwesomeIcon icon={faPen} className="ml-3" />
                </button>
                <EditSkills />
              </div>
              <ul>
                {u && u.skills.length ? (
                  u.skills.map((skill) => <li key={skill.id}>{skill.skill}</li>)
                ) : (
                  <div className="dashboard__completeProfile">
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mr-2"
                    />
                    Add your skills to complete your profile
                  </div>
                )}
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

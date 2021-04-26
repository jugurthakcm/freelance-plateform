import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import avatar from '../assets/images/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPen,
  faMapMarkerAlt,
  faPlus,
  faTrash,
  faExclamationCircle,
  faStar,
  faCamera,
} from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import EditLanguage from '../components/dashboardModals/EditLanguage';
import AddLanguage from '../components/dashboardModals/AddLanguage';
import AddEducation from '../components/dashboardModals/AddEducation';
import AddExperience from '../components/dashboardModals/AddExperience';
import EditTitle from '../components/dashboardModals/EditTitle';
import EditBio from '../components/dashboardModals/EditBio';
import {
  deleteEducation,
  deleteExperience,
  loadUser,
} from '../data/actions/userActions';
import EditEducation from '../components/dashboardModals/EditEducation';
import EditExperience from '../components/dashboardModals/EditExperience';
import { sortEducation } from '../util';
import EditSkills from '../components/dashboardModals/EditSkills';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { deleteGig, getMyGigs } from '../data/actions/gigActions';
import axios from '../axios';
import Avatar from './Avatar';
import api from '../api';
import { extractImageFileExtensionFromBase64 } from '../util';
import StackGrid from 'react-stack-grid';

const Dashboard = () => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const u = user.user;

  const gig = useSelector((state) => state.gig);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.token) history.push('/login');
    user.token && dispatch(getMyGigs(user.token));
  }, [user, history, dispatch]);

  const handleMouseEnter = () => {
    document.querySelector('.user__imageEdit label').classList.add('d-flex');
    document.querySelector('.user__imageEdit label').classList.remove('d-none');
  };
  const handleMouseLeave = () => {
    document.querySelector('.user__imageEdit label').classList.add('d-none');
    document.querySelector('.user__imageEdit label').classList.remove('d-flex');
  };

  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrcExt, setImageSrcExt] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const myFileItemreader = new FileReader();
    myFileItemreader.addEventListener(
      'load',
      () => {
        const myResult = myFileItemreader.result;
        setImageSrc(myResult);
        setImageSrcExt(extractImageFileExtensionFromBase64(myResult));
      },
      false
    );

    myFileItemreader.readAsDataURL(file);
  };

  useEffect(() => {
    document.title = 'Dashboard - Freelancer';
  }, []);

  return (
    <>
      {!user.isLoading && (
        <>
          <Avatar imageSrc={imageSrc} imageSrcExt={imageSrcExt} />
          <Navbar />
          {u && !u.confirmedEmail && (
            <div className="dashboard__confirmEmail container">
              <h5>Important !</h5>
              <p>
                A confirmation email was sent to your adress mail, please
                confirm your registration.
              </p>
            </div>
          )}

          <div className="dashboard__container container-lg">
            <div className="row">
              <div className="dashboard__user dashboard col-md-4">
                <div className="dashboard__userTop">
                  <div
                    className="user__image"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {u && u.imageURI ? (
                      <img
                        src={api + '/uploads/avatars/' + u.imageURI}
                        alt="avatar"
                        width="140px"
                        className="user__imageAvatar"
                      />
                    ) : (
                      <img
                        src={avatar}
                        alt="avatar"
                        width="140px"
                        className="user__imageAvatar"
                      />
                    )}

                    <div className="user__imageEdit">
                      <label htmlFor="avatar" className="d-none">
                        <FontAwesomeIcon
                          icon={faCamera}
                          className="me-2"
                          size={'sm'}
                        />
                        Edit
                      </label>
                      <input
                        type="file"
                        name="avatar"
                        id="avatar"
                        onChange={handleFileSelect}
                        accept="image/x-png,image/jpeg,image/jpg, image/png"
                      />
                    </div>
                  </div>

                  <div className="user__info">
                    <h5>{u && u.firstName + ' ' + u.lastName}</h5>
                    <h6 className="user__title">
                      {u && u.title ? u.title : 'Add your title'}
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#editTitleModal"
                        className="dashboard__editBtn"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <EditTitle />
                    </h6>
                    <div className="user__description">
                      <div className="dashboard__title">
                        <h5>Description</h5>
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#editBioModal"
                          className="dashboard__editBtn"
                        >
                          <FontAwesomeIcon icon={faPen} />
                        </button>
                      </div>
                      <p className="mb-2">{u && u.bio && u.bio}</p>
                    </div>
                    <EditBio />
                  </div>
                </div>

                <div className="dashboard__userBottom">
                  <div className="dashboard__section sidebar__languages">
                    <div className="dashboard__title languages__title">
                      <h5>Languages</h5>
                      <span className="d-flex">
                        <button
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#addLanguagesModal"
                          className="dashboard__editBtn ms-2"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        {u && u.languages.length ? (
                          <button
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#languagesModal"
                            className="dashboard__editBtn ms-2"
                          >
                            <FontAwesomeIcon icon={faPen} />
                          </button>
                        ) : null}
                      </span>

                      <AddLanguage />
                      <EditLanguage />
                    </div>

                    <ul>
                      {u && u.languages.length
                        ? u.languages.map((lang) => (
                            <li key={lang.id}>
                              {lang.language} : <span>{lang.level}</span>
                            </li>
                          ))
                        : null}
                    </ul>
                  </div>
                  <div className="dashboard__section presentation__skills">
                    <div className="dashboard__title skills__title">
                      <h5>Skills</h5>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#editSkillsModal"
                        className="dashboard__editBtn ms-2"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <EditSkills />
                    </div>
                    <ul>
                      {u && u.skills.length
                        ? u.skills.map((skill) => (
                            <li key={skill.id}>{skill.skill}</li>
                          ))
                        : null}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="dashboard__right col-md-8">
                <div className="dashboard__education dashboard mb-3">
                  <div className="dashboard__title">
                    <h5>Education</h5>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#EducationModal"
                      className="dashboard__editBtn"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <AddEducation />
                  </div>
                  {u && u.education.length
                    ? u.education.sort(sortEducation).map((e) => (
                        <div key={e.id} className="mb-2">
                          <div className="education__school d-flex align-items-start justify-content-between">
                            <h6>{e.school}</h6>
                            <div className="d-flex align-items-center justify-content-between">
                              <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={'#EditEducationModal' + e.id}
                                className="dashboard__editBtn"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                              <button className="dashboard__editBtn ms-2">
                                <FontAwesomeIcon
                                  icon={faTrash}
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
                    : null}
                </div>

                <div className="dashboard__experience dashboard">
                  <div className="dashboard__title">
                    <h5>Experience</h5>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#ExperienceModal"
                      className="dashboard__editBtn"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <AddExperience />
                  </div>
                  {u && u.experience.length
                    ? u.experience.sort(sortEducation).map((e) => (
                        <div key={e.id} className="mb-2">
                          <div className="education__school d-flex align-items-start justify-content-between">
                            <h6>{e.company}</h6>
                            <div className="d-flex align-items-center justify-content-between">
                              <button
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target={'#EditExperienceModal' + e.id}
                                className="dashboard__editBtn"
                              >
                                <FontAwesomeIcon icon={faPen} />
                              </button>
                              <button className="dashboard__editBtn ms-2">
                                <FontAwesomeIcon
                                  icon={faTrash}
                                  onClick={() =>
                                    dispatch(deleteExperience(e.id, user.token))
                                  }
                                />
                              </button>
                            </div>
                          </div>

                          <EditExperience data={e} />

                          <p className="education__details">
                            {e.job}, <br />
                            {e.areaOfWork}
                          </p>
                          <p className="education__year">
                            {e.yearStart}-{e.yearEnd}
                          </p>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="dashboard dashboard__gigs">
                <div className="dashboard__gigsHeader">
                  <h2>My Gigs</h2>
                  <Link to="/gig/add">
                    <button className="btn btn-success d-flex align-items-center">
                      <FontAwesomeIcon
                        icon={faPlus}
                        className="me-2 icon-white"
                        size={'xs'}
                      />
                      <span style={{ color: 'white' }}>Add gig</span>
                    </button>
                  </Link>
                </div>

                <div className="mt-4">
                  {gig && gig.myGigs && gig.myGigs.length ? (
                    <StackGrid
                      columnWidth={275}
                      gutterWidth={30}
                      gutterHeight={20}
                      monitorImagesLoaded={true}
                    >
                      {gig.myGigs.map((gig) => (
                        <div key={gig._id}>
                          <div className="store__gig">
                            <div className="gig__image">
                              <img
                                src={`${api}/uploads/gigs/${gig.imageURI}`}
                                alt="gig"
                              />
                            </div>
                            <div className="gig__details mx-3 my-2">
                              <p className="gig__type">{gig.category.title}</p>
                              <h5 className="gig__title">{gig.title}</h5>
                              <div className="gig__footer">
                                <span className="gig__footerPrice">
                                  {gig.price} $
                                </span>
                                <span>
                                  <FontAwesomeIcon icon={faStar} /> {gig.rating}
                                </span>
                              </div>
                              <div className="gig__buttons">
                                <Link to={`/gig/edit/${gig._id}`}>
                                  <button className="btn btn-warning me-2 d-flex align-items-center">
                                    <FontAwesomeIcon
                                      icon={faPen}
                                      className="me-2"
                                      size={'xs'}
                                    />
                                    <span>Edit</span>
                                  </button>
                                </Link>
                                <button
                                  className="btn btn-danger ms-2 d-flex align-items-center"
                                  onClick={() =>
                                    dispatch(deleteGig(gig._id, user.token))
                                  }
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="me-2 icon-white"
                                    size={'xs'}
                                  />
                                  <span style={{ color: 'white' }}>Delete</span>
                                </button>
                              </div>
                              <p className="dashboard__gigState">
                                {!gig.confirmed & gig.pending ? (
                                  <strong className="text-warning">
                                    Reviewing by an Admin
                                  </strong>
                                ) : null}
                                {gig.confirmed & !gig.pending ? (
                                  <strong className="text-success">
                                    Approved
                                  </strong>
                                ) : null}
                                {!gig.confirmed & !gig.pending ? (
                                  <strong className="text-danger">
                                    Refused
                                  </strong>
                                ) : null}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </StackGrid>
                  ) : (
                    <div className="text-center">You don't have any gigs</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Dashboard;

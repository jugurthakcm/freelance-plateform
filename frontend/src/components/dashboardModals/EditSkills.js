import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './dashboardModal.css';
import { updateSkills } from '../../data/actions/userActions';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';

const EditSkills = () => {
  const user = useSelector((state) => state.user);
  const u = user && user.user;

  const dispatch = useDispatch();

  const [skills, setSkills] = useState([]);

  const schema = Joi.object({
    skill: Joi.string().trim().min(2).max(50).required(),
  });

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    u && setSkills(u.skills);
  }, [u]);

  const submitForm = (e) => {
    setSkills([...skills, { id: uuidv4(), skill: e.skill }]);
    setValue('skill', '');
  };

  const handleClickSave = () => {
    user.token && dispatch(updateSkills(skills, user.token));
  };

  const deleteSkill = (id) => {
    setSkills(skills.filter((e) => e.id !== id));
  };

  return (
    <div
      className="modal fade"
      id="editSkillsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="skillsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4
              className="modal-title"
              id="titleModalLabel"
              style={{ fontWeight: 500, fontSize: '1.5rem' }}
            >
              Edit Skills
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="modal-body">
            <h6>Skills</h6>

            <ul className="modal__skillsList">
              {skills &&
                skills.map((skill) => (
                  <li className="modal__skill" key={skill.id}>
                    {skill.skill}
                    <FontAwesomeIcon
                      icon={faTimes}
                      size={'xs'}
                      className="ml-2"
                      onClick={() => deleteSkill(skill.id)}
                    />
                  </li>
                ))}
            </ul>

            <form
              className="modal__skillsForm"
              onSubmit={handleSubmit(submitForm)}
            >
              <input
                type="text"
                name="skill"
                placeholder="Add your skill..."
                ref={register}
                className={` ${errors.skill ? 'inputError' : null}`}
              />

              <button type="submit" className="btn btn-warning">
                Add
              </button>
            </form>
            {errors.skill && (
              <p className="textError">{errors.skill?.message}</p>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleClickSave}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSkills;

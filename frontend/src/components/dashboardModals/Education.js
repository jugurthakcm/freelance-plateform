import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { generateYears } from '../../util';
import './dashboardModal.css';
import { useDispatch, useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { updateEducation } from '../../data/actions/userActions';

const Education = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const schema = Joi.object({
    school: Joi.string().trim().min(2).max(30).required(),
    yearStart: Joi.number().required(),
    yearEnd: Joi.number().required(),
    degree: Joi.string().trim().min(2).max(30).required(),
    areaOfStudy: Joi.string().trim().min(2).max(30).required(),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const submitForm = (e) => {
    dispatch(updateEducation('1GBf', e, user.token));
  };

  return (
    <div
      className="modal fade"
      id="EducationModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="EducationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="modal-header">
              <h4 className="modal-title" id="EducationModalLabel">
                Education
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
              <div className="modal__field">
                <label htmlFor="school">
                  <h6>School</h6>
                </label>
                <input
                  type="text"
                  name="school"
                  placeholder="School"
                  ref={register}
                />
              </div>

              <div className="modal__field">
                <label htmlFor="year">
                  <h6>Dates of attendance</h6>
                </label>
                <div className="d-flex justify-content-between education__years">
                  <select name="yearStart" ref={register} defaultValue="From">
                    <option disabled>From</option>
                    {generateYears(false).map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <select name="yearEnd" ref={register} defaultValue="To">
                    <option disabled>To</option>
                    {generateYears(true).map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="modal__field">
                <label htmlFor="degree">
                  <h6>Degree</h6>
                </label>
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree"
                  ref={register}
                />
              </div>

              <div className="modal__field">
                <label htmlFor="areaStudy">
                  <h6>Area of study</h6>
                </label>
                <input
                  type="text"
                  name="areaOfStudy"
                  placeholder="Area of study"
                  ref={register}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-warning">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Education;

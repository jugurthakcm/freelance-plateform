import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { generateYears, hideModal } from '../../util';
import './dashboardModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { loadUser, updateEducation } from '../../data/actions/userActions';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';

const EditEducation = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const schema = Joi.object({
    school: Joi.string().required().min(5).max(50),
    degree: Joi.string().required().min(3).max(50),
    yearStart: Joi.number().required().integer().positive(),
    yearEnd: Joi.number().required().integer().positive(),
    areaOfStudy: Joi.string().required().min(3).max(50),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const e = user.error;

  const submitForm = (e) => {
    user.token && dispatch(updateEducation(data.id, e, user.token));
    if (!e) {
      const modal = new bootstrapBundle.Modal(
        document.getElementById('EditEducationModal')
      );

      hideModal(modal);
    }
  };

  return (
    <div
      className="modal fade"
      id={'EditEducationModal' + data.id}
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
              ></button>
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
                  defaultValue={data.school}
                  ref={register}
                  className={`${
                    errors.school || (e && e.field === 'school')
                      ? 'inputError'
                      : null
                  }`}
                />
                {errors.school && (
                  <p className="textError">{errors.school?.message}</p>
                )}
                {e && e.field === 'school' && (
                  <p className="textError">{e.error}</p>
                )}
              </div>

              <div className="modal__field">
                <label htmlFor="year">
                  <h6>Dates of attendance</h6>
                </label>
                <div className="d-flex justify-content-between education__years">
                  <select
                    name="yearStart"
                    ref={register}
                    defaultValue={data.yearStart}
                  >
                    <option disabled>From</option>
                    {generateYears(false).map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <select
                    name="yearEnd"
                    ref={register}
                    defaultValue={data.yearEnd}
                  >
                    <option disabled>To</option>
                    {generateYears(true).map((year) => (
                      <option value={year} key={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.yearStart && (
                  <p className="textError">{errors.yearStart?.message}</p>
                )}
                {e && e.field === 'yearStart' && (
                  <p className="textError">{e.error}</p>
                )}
                {errors.yearEnd && (
                  <p className="textError">{errors.yearEnd?.message}</p>
                )}
                {e && e.field === 'yearEnd' && (
                  <p className="textError">{e.error}</p>
                )}
                {e && e.field === 'year' && (
                  <p className="textError">{e.error}</p>
                )}
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
                  defaultValue={data.degree}
                  className={`${
                    errors.degree || (e && e.field === 'degree')
                      ? 'inputError'
                      : null
                  }`}
                />
                {errors.degree && (
                  <p className="textError">{errors.degree?.message}</p>
                )}
                {e && e.field === 'degree' && (
                  <p className="textError">{e.error}</p>
                )}
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
                  defaultValue={data.areaOfStudy}
                  className={`${
                    errors.areaOfStudy || (e && e.field === 'areaOfStudy')
                      ? 'inputError'
                      : null
                  }`}
                />
                {errors.areaOfStudy && (
                  <p className="textError">{errors.areaOfStudy?.message}</p>
                )}
                {e && e.field === 'areaOfStudy' && (
                  <p className="textError">{e.error}</p>
                )}
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

export default EditEducation;

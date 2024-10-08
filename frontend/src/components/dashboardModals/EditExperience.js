import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { generateYears, hideModal } from '../../util';
import './dashboardModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { loadUser, updateExperience } from '../../data/actions/userActions';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';

const EditExperience = ({ data }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const schema = Joi.object({
    company: Joi.string().required().min(5).max(50),
    job: Joi.string().required().min(3).max(50),
    yearStart: Joi.number().required().integer().positive(),
    yearEnd: Joi.number().required().integer().positive(),
    areaOfWork: Joi.string().required().min(3).max(50),
  });

  const { register, handleSubmit, errors } = useForm({
    resolver: joiResolver(schema),
  });

  const e = user.error;

  const submitForm = (e) => {
    user.token && dispatch(updateExperience(data.id, e, user.token));
    if (!e) {
      const modal = new bootstrapBundle.Modal(
        document.getElementById('EditExperienceModal')
      );

      hideModal(modal);
    }
  };

  return (
    <div
      className="modal fade"
      id={'EditExperienceModal' + data.id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="ExperienceModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="modal-header">
              <h4 className="modal-title" id="ExperienceModalLabel">
                Experience
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
                <label htmlFor="company">
                  <h6>Company</h6>
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Company"
                  defaultValue={data.company}
                  ref={register}
                  className={`${
                    errors.company || (e && e.field === 'company')
                      ? 'inputError'
                      : null
                  }`}
                />
                {errors.company && (
                  <p className="textError">{errors.company?.message}</p>
                )}
                {e && e.field === 'company' && (
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
                <label htmlFor="job">
                  <h6>Job</h6>
                </label>
                <input
                  type="text"
                  name="job"
                  placeholder="Job"
                  ref={register}
                  defaultValue={data.job}
                  className={`${
                    errors.job || (e && e.field === 'job') ? 'inputError' : null
                  }`}
                />
                {errors.job && (
                  <p className="textError">{errors.job?.message}</p>
                )}
                {e && e.field === 'job' && (
                  <p className="textError">{e.error}</p>
                )}
              </div>

              <div className="modal__field">
                <label htmlFor="areaOfWork">
                  <h6>Area of work</h6>
                </label>
                <input
                  type="text"
                  name="areaOfWork"
                  placeholder="Area of work"
                  ref={register}
                  defaultValue={data.areaOfWork}
                  className={`${
                    errors.areaOfWork || (e && e.field === 'areaOfWork')
                      ? 'inputError'
                      : null
                  }`}
                />
                {errors.areaOfWork && (
                  <p className="textError">{errors.areaOfWork?.message}</p>
                )}
                {e && e.field === 'areaOfWork' && (
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
              <button type="submit" className="btn btn-info">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExperience;

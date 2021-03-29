import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './dashboardModal.css';
import { loadUser, updateBio } from '../../data/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import bootstrap from 'bootstrap';
// import $ from 'jquery';

const EditBio = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const schema = Joi.object({
    bio: Joi.string().trim().min(10).max(1500).required(),
  });

  const { register, handleSubmit, errors, setValue, watch } = useForm({
    resolver: joiResolver(schema),
  });

  const submitForm = (e) => {
    user.token && dispatch(updateBio(e.bio, user.token));
  };

  const watchBioLength = watch('bio') && watch('bio').length;

  useEffect(() => {
    user && setValue('bio', user.bio);
  }, [user, setValue]);

  return (
    <div
      className="modal fade"
      id="editBioModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="bioModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4
              className="modal-title"
              id="bioModalLabel"
              style={{ fontWeight: 500, fontSize: '1.5rem' }}
            >
              Edit Description
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              style={{ backgroundColor: 'inherit', border: 'none' }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => setValue('bio', user.bio)}
              />
            </button>
          </div>

          <form className="modal__field" onSubmit={handleSubmit(submitForm)}>
            <div className="modal-body">
              <label>
                <h6>Description</h6>
              </label>
              <textarea
                name="bio"
                cols="30"
                rows="5"
                ref={register}
                className={` ${errors.bio ? 'inputError' : null}`}
              ></textarea>
              <p className="d-flex justify-content-end mt-2">
                <strong className="text-secondary">
                  {watchBioLength ? watchBioLength : 0} / 1500
                </strong>
              </p>
              {errors.bio && <p className="textError">{errors.bio?.message}</p>}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setValue('bio', user.bio)}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn btn-warning"
                data-bs-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBio;

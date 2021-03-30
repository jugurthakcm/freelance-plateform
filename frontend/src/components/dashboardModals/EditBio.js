import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './dashboardModal.css';
import { loadUser, updateBio } from '../../data/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { hideModal } from '../../util';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';
import { model } from 'mongoose';

const EditBio = () => {
  const user = useSelector((state) => state.user);
  const u = user.user;
  const dispatch = useDispatch();

  const schema = Joi.object({
    bio: Joi.string().trim().min(10).max(1500).required(),
  });

  const { register, handleSubmit, errors, setValue, watch } = useForm({
    resolver: joiResolver(schema),
  });

  const submitForm = (e) => {
    user.token && dispatch(updateBio(e.bio, user.token));
    const modal = new bootstrapBundle.Modal(
      document.getElementById('editBioModal')
    );

    hideModal(modal);
  };

  const watchBioLength = watch('bio') && watch('bio').length;

  useEffect(() => {
    u && setValue('bio', u.bio);
  }, [u, setValue]);

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
              aria-label="Close"
              data-bs-dismiss="modal"
              style={{ backgroundColor: 'inherit', border: 'none' }}
              onClick={() => {
                u && setValue('bio', u.bio);
              }}
            ></button>
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
              <div className="d-flex justify-content-between mt-2">
                <p className="textError">{errors.bio && errors.bio?.message}</p>

                <p>
                  <strong className="text-secondary">
                    {watchBioLength ? watchBioLength : 0} / 1500
                  </strong>
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => {
                  u && setValue('bio', u.bio);
                }}
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

export default EditBio;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import './dashboardModal.css';
import { updateTitle } from '../../data/actions/userActions';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';
import { hideModal } from '../../util';

const EditTitle = () => {
  const user = useSelector((state) => state.user);
  const u = user.user;
  const dispatch = useDispatch();

  const schema = Joi.object({
    title: Joi.string().trim().min(2).max(50).required(),
  });

  const { register, handleSubmit, setValue, errors } = useForm({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    u && setValue('title', u.title);
  }, [u, setValue]);

  const submitForm = (e) => {
    user.token && dispatch(updateTitle(e.title, user.token));
    const modal = new bootstrapBundle.Modal(
      document.getElementById('editTitleModal')
    );

    hideModal(modal);
    setValue('title', '');
  };

  return (
    <div
      className="modal fade"
      id="editTitleModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="titlesModalLabel"
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
              Edit Title
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={() => setValue('title', u.title)}
            ></button>
          </div>

          <form className="modal__field" onSubmit={handleSubmit(submitForm)}>
            <div className="modal-body">
              <label>
                <h6>Title</h6>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                ref={register}
                className={` ${errors.title ? 'inputError' : null}`}
              />
              {errors.title && (
                <p className="textError">{errors.title?.message}</p>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setValue('title', u.title)}
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

export default EditTitle;

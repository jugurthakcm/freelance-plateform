import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './EditTitle.css';

const EditTitle = () => {
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
              style={{ backgroundColor: 'inherit', border: 'none' }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="modal-body">
            <form className="editTitle__form">
              <label className="row">
                <h6>Title</h6>
              </label>

              <input
                type="text"
                name="title"
                placeholder="Title"
                className="row"
              />
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-warning">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTitle;

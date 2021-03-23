import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './dashboardModal.css';
import { updateBio } from '../../data/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const EditBio = () => {
  const [bio, setBio] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    user.user && setBio(user.user.bio);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    user.token && dispatch(updateBio(bio, user.token));
    setBio('');
  };

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
              <FontAwesomeIcon icon={faTimes} onClick={() => setBio('')} />
            </button>
          </div>

          <form className="modal__field" onSubmit={handleSubmit}>
            <div className="modal-body">
              <label>
                <h6>Description</h6>
              </label>
              <textarea
                name="bio"
                cols="30"
                rows="5"
                onChange={(e) => setBio(e.target.value)}
                value={bio}
              ></textarea>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setBio('')}
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

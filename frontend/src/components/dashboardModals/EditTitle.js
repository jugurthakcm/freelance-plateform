import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import './dashboardModal.css';
import { updateTitle } from '../../data/actions/userActions';

const EditTitle = () => {
  const [title, setTitle] = useState('');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    user.user && setTitle(user.user.title);
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    user.token && dispatch(updateTitle(title, user.token));
    setTitle('');
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
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <form className="modal__field" onSubmit={handleSubmit}>
            <div className="modal-body">
              <label>
                <h6>Title</h6>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setTitle('')}
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

export default EditTitle;

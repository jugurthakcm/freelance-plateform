import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './dashboardModal.css';
import languages from '../../data/languages';
import { useDispatch, useSelector } from 'react-redux';
import { addLanguage } from '../../data/actions/userActions';
import { v4 as uuidv4 } from 'uuid';
import { hideModal } from '../../util';
import bootstrapBundle from 'bootstrap/dist/js/bootstrap.bundle';

const AddLanguage = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ language: 'English', level: 'Basic' });
  const user = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addLanguage(uuidv4(), data, user.token));
    const modal = new bootstrapBundle.Modal(
      document.getElementById('addLanguagesModal')
    );

    hideModal(modal);
  };

  return (
    <div
      className="modal fade"
      id="addLanguagesModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="languagesModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h4 className="modal-title" id="languagesModalLabel">
                Add languages
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
                <h6>Language</h6>
                <select
                  id="language"
                  onChange={(e) =>
                    setData({ ...data, language: e.target.value })
                  }
                  defaultValue="English"
                >
                  <option disabled>Language</option>
                  {languages.map((lang) => (
                    <option value={lang.name} key={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal__field">
                <h6>Proficiency</h6>
                <select
                  id="level"
                  onChange={(e) => setData({ ...data, level: e.target.value })}
                  defaultValue="Basic"
                >
                  <option value="Basic">Basic</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native or Bilingual">
                    Native or Bilingual
                  </option>
                </select>
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

export default AddLanguage;

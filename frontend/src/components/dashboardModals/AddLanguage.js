import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './EditLanguage.css';
import languages from '../../data/languages';

const AddLanguage = () => {
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
          <div className="modal-header">
            <h4 className="modal-title" id="languagesModalLabel">
              Add languages
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
            <div className="addLanguage__modal">
              <h6>Language</h6>
              <select className="p-2 rounded d-block bg-white mb-4">
                {languages.map((lang) => (
                  <option value={lang.name}>{lang.name}</option>
                ))}
              </select>

              <h6>Proficiency</h6>
              <select className="p-2 rounded d-block bg-white">
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Fluent">Fluent</option>
                <option value="Native_Bilingual">Native or Bilingual</option>
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
            <button type="button" className="btn btn-warning">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLanguage;

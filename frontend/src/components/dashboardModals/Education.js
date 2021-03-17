import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { generateYears } from '../../util';
import './Education.css';

const Education = () => {
  return (
    <div
      className="modal fade"
      id="EducationModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="EducationModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="EducationModalLabel">
              Education
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
            <form className="education__form">
              <div className="education__field">
                <label htmlFor="school" className="row">
                  <h6>School</h6>
                </label>
                <input
                  type="text"
                  name="school"
                  placeholder="School"
                  className="row"
                />
              </div>

              <div className="education__field">
                <label htmlFor="year" className="row">
                  <h6>Dates of attendance</h6>
                </label>
                <div className="row justify-content-between">
                  <select name="yearStart">
                    <option disabled selected>
                      From
                    </option>
                    {generateYears(false).map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                  <select name="yearStart">
                    <option disabled selected>
                      To
                    </option>
                    {generateYears(true).map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="education__field">
                <label htmlFor="degree" className="row">
                  <h6>Degree</h6>
                </label>
                <input
                  type="text"
                  name="degree"
                  placeholder="Degree"
                  className="row"
                />
              </div>
              <div className="education__field">
                <label htmlFor="areaStudy" className="row">
                  <h6>Area of study</h6>
                </label>
                <input
                  type="text"
                  name="areaStudy"
                  placeholder="Area of study"
                  className="row"
                />
              </div>
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

export default Education;

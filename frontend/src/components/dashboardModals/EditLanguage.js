import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import './dashboardModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateLanguage } from '../../data/actions/userActions';

const EditLanguage = () => {
  const user = useSelector((state) => state.user);
  const u = user.user && user.user;
  const dispatch = useDispatch();

  const [data, setData] = useState();

  useEffect(() => {
    u && setData(u.languages);
  }, [u]);

  const deleteLanguage = (id) => {
    setData(data.filter((e) => e.id !== id));
  };

  const handleClose = () => {
    setData(u.languages);
  };

  const handleChange = (id, language, level) => {
    const arr = data.filter((e) => e.id === id);
    const pos = data.indexOf(arr[0]);
    let newArr = [...data];
    newArr[pos] = { id, language, level };
    setData(newArr);
  };

  const handleSubmit = () => {
    user.token && dispatch(updateLanguage(data, user.token));
  };

  return (
    <div
      className="modal fade"
      id="languagesModal"
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
              Edit languages
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {data &&
              data.map((lang) => (
                <div className="mb-3" key={lang.id}>
                  <h6>{lang.language}</h6>
                  <div className="d-flex align-items-center justify-content-between">
                    <select
                      defaultValue={lang.level}
                      onChange={(e) =>
                        handleChange(lang.id, lang.language, e.target.value)
                      }
                      value={data.level}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Native or Bilingual">
                        Native or Bilingual
                      </option>
                    </select>
                    <button>
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="ms-3"
                        onClick={() => deleteLanguage(lang.id)}
                      />
                    </button>
                  </div>
                </div>
              ))}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={handleSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditLanguage;

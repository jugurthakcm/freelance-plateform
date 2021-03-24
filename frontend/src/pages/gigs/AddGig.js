import React, { useEffect, useState } from 'react';
import './Gig.css';
import Navbar from '../../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import axios from '../../axios';

const AddGig = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('/categories/')
      .then((data) => setCategories(data.data))
      .catch((err) => console.error(err));
  }, [categories]);

  return (
    <>
      <Navbar />
      <div className="gigPage container">
        <form className="row">
          <div className="gigPage__info col-md-7">
            <div className="gigPage__inputField">
              <h4>Title</h4>
              <input type="text" name="title" placeholder="Title" />
            </div>

            <div className="gigPage__inputField">
              <h4>Description</h4>
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Description"
              ></textarea>
            </div>

            <div className="gigPage__inputField">
              <h4>Category</h4>
              <select defaultValue="defineCategory">
                <option value="defineCategory" disabled>
                  Define Category
                </option>
                {categories &&
                  categories.map((category) => (
                    <option value={category.title} key={category._id}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="gigPage__inputField">
              <h4>Price</h4>
              <input type="number" name="price" placeholder="Price" min="1" />
            </div>

            <div className="gigPage__inputField">
              <h4>Delivery Time</h4>
              <div className="gigPage__infoDeliveryTime">
                <input
                  type="number"
                  name="deliveryTime"
                  min="1"
                  placeholder="Delivery Time"
                />
                <select name="deliveryTimeType">
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                  <option value="Years">Weeks</option>
                  <option value="Months">Months</option>
                </select>
              </div>
            </div>

            <div className="gigPage__inputSubmit">
              <button type="submit" className="btn btn-warning">
                Save changes
              </button>
            </div>
          </div>
          <div className="gigPage__image col-md-5">
            <label htmlFor="upload-image">
              <div>
                <FontAwesomeIcon icon={faCloudUploadAlt} size={'6x'} />
                <p>Upload image...</p>
              </div>
            </label>
            <input type="file" name="image" id="upload-image" />
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddGig;

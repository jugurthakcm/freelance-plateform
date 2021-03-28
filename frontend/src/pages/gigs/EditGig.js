import React, { useEffect, useState } from 'react';
import './Gig.css';
import Navbar from '../../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../components/Footer';
import axios from '../../axios';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import Joi from 'joi';
import { useDispatch, useSelector } from 'react-redux';
import { addGig, editGig } from '../../data/actions/gigActions';
import { useHistory } from 'react-router-dom';

const EditGig = (props) => {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const gigId = props.match.params.gigId;

  const schema = Joi.object({
    title: Joi.string().trim().min(1).max(50).required(),
    description: Joi.string().trim().required().min(1).max(1500),
    price: Joi.number().required().min(1),
    deliveryTime: Joi.number().required().min(1),
    deliveryTimeType: Joi.string().trim().required().min(1),
    category: Joi.string().trim().required().min(1).max(50),
  });

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: joiResolver(schema),
  });

  useEffect(() => {
    if (!user.token) history.push('/login');

    axios
      .get('/categories/')
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));

    axios
      .get('/gigs/' + gigId)
      .then((res) => {
        const gig = res.data.data[0];
        setValue('title', gig.title);
        setValue('description', gig.description);
        setValue('category', gig.categoryId);
        setValue('price', gig.price);
        setValue('deliveryTime', gig.deliveryTime.split(' ')[0]);
        setValue('deliveryTimeType', gig.deliveryTime.split(' ')[1]);
      })
      .catch((err) => console.error(err));
  }, [user, history, gigId, setValue]);

  const dispatch = useDispatch();

  const submitForm = (e) => {
    user.token && dispatch(editGig(gigId, e, user.token));
  };

  return (
    <>
      <Navbar />
      <div className="gigPage container">
        <form className="row" onSubmit={handleSubmit(submitForm)}>
          <div className="gigPage__info col-md-7">
            <div className="gigPage__inputField">
              <h4>Title</h4>
              <input
                type="text"
                name="title"
                placeholder="Title"
                ref={register}
              />
            </div>

            <div className="gigPage__inputField">
              <h4>Description</h4>
              <textarea
                name="description"
                cols="30"
                rows="5"
                placeholder="Description"
                ref={register}
              ></textarea>
            </div>

            <div className="gigPage__inputField">
              <h4>Category</h4>
              <select
                name="category"
                defaultValue="defineCategory"
                ref={register}
              >
                <option value="defineCategory" disabled>
                  Define Category
                </option>
                {categories &&
                  categories.map((category) => (
                    <option value={category._id} key={category._id}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>

            <div className="gigPage__inputField">
              <h4>Price</h4>
              <input
                type="number"
                name="price"
                placeholder="Price"
                min="1"
                ref={register}
              />
            </div>

            <div className="gigPage__inputField">
              <h4>Delivery Time</h4>
              <div className="gigPage__infoDeliveryTime">
                <input
                  type="number"
                  name="deliveryTime"
                  min="1"
                  placeholder="Delivery Time"
                  ref={register}
                />
                <select name="deliveryTimeType" ref={register}>
                  <option value="Hours">Hours</option>
                  <option value="Days">Days</option>
                  <option value="Weeks">Weeks</option>
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

export default EditGig;

import React, { useEffect, useState, useRef } from 'react';
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
import api from '../../api';

const EditGig = (props) => {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const [imageFile, setImageFile] = useState(null);

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
        setValue('category', gig.category.id);
        setValue('price', gig.price);
        setValue('deliveryTime', gig.deliveryTime.split(' ')[0]);
        setValue('deliveryTimeType', gig.deliveryTime.split(' ')[1]);
        setImageSrc(api + '/uploads/gigs/' + gig.imageURI);
      })
      .catch((err) => console.error(err));
  }, [user, history, gigId, setValue]);

  const dispatch = useDispatch();

  const submitForm = (e) => {
    const formData = new FormData();

    if (!imageFile) {
      fetch(imageSrc)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], 'dot.png', blob);
          formData.append('file', file);
        });
    } else {
      formData.append('file', imageFile);
    }

    user.token && dispatch(editGig(gigId, e, formData, user.token));
  };

  const imageParent = useRef();
  const [imageWidth, setImageWidth] = useState(null);

  useEffect(() => {
    imageParent.current && setImageWidth(imageParent.current.offsetWidth);
  }, [imageParent]);

  window.addEventListener('resize', () => {
    setImageWidth(imageParent.current.offsetWidth);
  });

  const [imageSrc, setImageSrc] = useState(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    const myFileItemreader = new FileReader();
    myFileItemreader.addEventListener(
      'load',
      () => {
        const myResult = myFileItemreader.result;
        setImageSrc(myResult);
      },
      false
    );
    myFileItemreader.readAsDataURL(file);
    setImageFile(e.target.files[0]);
  };

  return (
    <>
      <Navbar />
      <div className="gigPage container">
        <form className="row" onSubmit={handleSubmit(submitForm)}>
          <div className="gigPage__info col-md-7 d-flex flex-column justify-content-between">
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
              <button type="submit" className="btn btn-warning w-100 p-2">
                Save
              </button>
            </div>
          </div>
          <div className="gigPage__image col-md-5">
            <div
              className="d-flex flex-column justify-content-between h-100"
              ref={imageParent}
            >
              <img src={imageSrc} alt="gig" width={imageWidth} />
              <div className="gigImage__anotherImage mt-2">
                <label
                  htmlFor="upload-another-image"
                  className="btn btn-success w-100 p-2"
                >
                  Change the image
                </label>
                <input
                  type="file"
                  name="image"
                  id="upload-another-image"
                  className="d-none"
                  onChange={handleUploadImage}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditGig;

import React, { useState, useEffect } from 'react';
import './Store.css';
import Navbar from '../components/Navbar';
import StackGrid from 'react-stack-grid';
import { store } from '../data/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import axios from '../axios';
import SearchBar from '../components/SearchBar';

const Store = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get('/categories/')
      .then((data) => setCategories(data.data))
      .catch((err) => console.error(err));
  }, [categories]);

  return (
    <>
      <Navbar navStore />

      <div className="store">
        {/* <div className="store__categories">
          <select
            name="categories"
            id="storeCategories"
            className="ml-2"
            defaultValue="Select a category"
          >
            <option disabled>Select a category</option>
            {categories.map((category) => (
              <option value={category.title} key={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div> */}
        <form>
          <SearchBar />
        </form>
        <StackGrid columnWidth={275} gutterWidth={20} gutterHeight={20}>
          {store.map((gig) => (
            <div className="store__gig">
              <div
                className="gig__image"
                style={{
                  backgroundColor: '#' + gig.color,
                  height: gig.height + 'px',
                }}
              ></div>
              <div className="gig__details mx-3 my-3">
                <p className="gig__type">{gig.type}</p>
                <h5 className="gig__title">{gig.title}</h5>
                <p className="gig__seller">Seller Name</p>
                <div className="gig__footer">
                  <button>Contact the seller</button>
                  <span>
                    <FontAwesomeIcon icon={faStar} /> {gig.likes}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </StackGrid>
      </div>
    </>
  );
};

export default Store;

import React, { useEffect } from 'react';
import './Store.css';
import Navbar from '../components/Navbar';
import StackGrid from 'react-stack-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import SearchBar from '../components/SearchBar';
import { useDispatch, useSelector } from 'react-redux';
import { exploreGigs } from '../data/actions/gigActions';
import api from '../api';

const Store = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const gig = useSelector((state) => state.gig);

  useEffect(() => {
    document.title = 'Explore - Freelancer';
  }, []);

  useEffect(() => {
    user.token && dispatch(exploreGigs(user.token));
  }, [user, dispatch]);

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
          {gig &&
            gig.exploreGigs &&
            gig.exploreGigs.map((gig) => (
              <div className="store__gig" key={gig._id}>
                <div className="gig__image">
                  <img
                    src={`${api}/uploads/gigs/${gig.imageURI}`}
                    alt="gig"
                    width={275}
                  />
                </div>
                <div className="gig__details mx-3 mt-2 mb-3">
                  <p className="gig__type">{gig.category.title}</p>
                  <h5 className="gig__title">{gig.title}</h5>
                  <p className="gig__seller">{gig.seller.name}</p>
                  <span className="gig__footerPrice">{gig.price} $</span>
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

import React from 'react';
import './Store.css';
import Navbar from '../components/Navbar';
import StackGrid from 'react-stack-grid';
import { store } from '../data/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const Store = () => {
  return (
    <>
      <Navbar />
      <div className="store">
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
                    <FontAwesomeIcon icon={faHeart} /> {gig.likes}
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

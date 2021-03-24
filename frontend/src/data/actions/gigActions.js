import axios from '../../axios';
import { gigActionTypes } from '../actionTypes';

export const addGig = (
  { title, description, category, price, deliveryTime, deliveryTimeType },
  token
) => (dispatch) => {
  axios
    .post(
      '/gigs/add',
      {
        title,
        description,
        category,
        price,
        deliveryTime: deliveryTime + ' ' + deliveryTimeType,
      },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: gigActionTypes.SUCCESS, payload: res });
      window.location.reload();
    })
    .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));
};

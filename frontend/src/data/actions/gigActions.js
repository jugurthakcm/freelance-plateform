import axios from '../../axios';
import { gigActionTypes } from '../actionTypes';

export const addGig = (
  { title, description, category, price, deliveryTime, deliveryTimeType },
  formData,
  token
) => (dispatch) => {
  axios
    .post(
      '/gigs/add',
      {
        title,
        description,
        categoryId: category,
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
      const id = res.data.data._id;
      axios
        .put(`/gigs/${id}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          dispatch({ type: gigActionTypes.SUCCESS, payload: res });
          window.location.href = '/dashboard';
        })
        .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));
};

export const getMyGigs = (token) => (dispatch) => {
  axios
    .get('/gigs/mygigs', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    .then((res) => {
      dispatch({ type: gigActionTypes.GET_MY_GIGS, payload: res });
    })
    .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));
};

export const deleteGig = (id, token) => (dispatch) => {
  axios
    .post(
      '/gigs/delete',
      { id },
      {
        headers: {
          authorization: 'Bearer ' + token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: gigActionTypes.GET_MY_GIGS, payload: res });

      // window.location.reload();
    })
    .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));
};

export const editGig = (
  gigId,
  { title, description, category, price, deliveryTime, deliveryTimeType },
  formData,
  token
) => (dispatch) =>
  axios
    .put(
      `/gigs/${gigId}/edit`,
      {
        title,
        description,
        categoryId: category,
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
      const id = res.data.gig._id;
      axios
        .put(`/gigs/${id}/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            authorization: 'Bearer ' + token,
          },
        })
        .then((res) => {
          dispatch({ type: gigActionTypes.SUCCESS, payload: res });
          window.location.href = '/dashboard';
        })
        .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));
    })
    .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));

export const exploreGigs = (token) => (dispatch) => {
  axios
    .get('/gigs/explore', {
      headers: {
        authorization: 'Bearer ' + token,
      },
    })
    .then((res) => {
      dispatch({ type: gigActionTypes.EXPLORE_GIGS, payload: res });
    })
    .catch((err) => dispatch({ type: gigActionTypes.ERROR, payload: err }));
};

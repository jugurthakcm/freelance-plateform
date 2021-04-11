import { gigActionTypes } from '../actionTypes';

const initialState = {
  success: null,
  error: null,
  myGigs: null,
  exploreGigs: null,
};

const gigReducer = (state = initialState, action) => {
  switch (action.type) {
    case gigActionTypes.SUCCESS:
      return {
        ...state,
        success: action.payload.data.message,
      };

    case gigActionTypes.ERROR:
      return {
        ...state,
        error: action.payload.response.data.error,
      };

    case gigActionTypes.GET_MY_GIGS:
      return {
        ...state,
        success: action.payload.data.message,
        myGigs: action.payload.data.data,
      };

    case gigActionTypes.EXPLORE_GIGS:
      return {
        ...state,
        success: action.payload.data.message,
        exploreGigs: action.payload.data.gigs,
      };

    default:
      return state;
  }
};

export default gigReducer;

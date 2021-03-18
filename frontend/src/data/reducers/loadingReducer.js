import { loadingActionTypes } from '../actionTypes';

const initialState = {
  loading: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case loadingActionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };

    case loadingActionTypes.NO_LOADING:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default loadingReducer;

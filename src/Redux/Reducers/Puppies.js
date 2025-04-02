// src/redux/reducers/puppiesReducer.js

import {
  FETCH_PUPPIES_REQUEST,
  FETCH_PUPPIES_SUCCESS,
  FETCH_PUPPIES_FAILURE,
  FETCH_PUPPY_REQUEST,
  FETCH_PUPPY_SUCCESS,
  FETCH_PUPPY_FAILURE,
  ADD_PUPPY_REQUEST,
  ADD_PUPPY_SUCCESS,
  ADD_PUPPY_FAILURE,
  UPDATE_PUPPY_REQUEST,
  UPDATE_PUPPY_SUCCESS,
  UPDATE_PUPPY_FAILURE,
  DELETE_PUPPY_REQUEST,
  DELETE_PUPPY_SUCCESS,
  DELETE_PUPPY_FAILURE,
} from '../Actions/puppiesActions';

const initialState = {
  puppies: [],
  loading: false,
  error: null,
  successMessage: null,
};

const puppiesReducer = (state = initialState, action) => {
  switch (action.type) {
    // Gestione della GET
    case FETCH_PUPPIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case FETCH_PUPPIES_SUCCESS:
      return {
        ...state,
        loading: false,
        puppies: action.payload,
      };
    case FETCH_PUPPIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Gestione della GET di un singolo puppy
    case FETCH_PUPPY_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_PUPPY_SUCCESS:
      return { ...state, loading: false, selectedPuppy: action.payload };

    case FETCH_PUPPY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // Gestione della POST
    case ADD_PUPPY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case ADD_PUPPY_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
        puppies: [...state.puppies, action.payload],
      };
    case ADD_PUPPY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Gestione della PUT
    case UPDATE_PUPPY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        successMessage: null,
      };
    case UPDATE_PUPPY_SUCCESS:
      return {
        ...state,
        loading: false,
        successMessage: action.payload,
      };
    case UPDATE_PUPPY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Gestione della DELETE
    case DELETE_PUPPY_REQUEST:
      return { ...state, loading: true };
    case DELETE_PUPPY_SUCCESS:
      return {
        ...state,
        loading: false,
        puppies: state.puppies.filter(
          (puppy) => puppy.puppyId !== action.payload
        ),
      };
    case DELETE_PUPPY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default puppiesReducer;

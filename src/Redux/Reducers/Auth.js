import { getRoleFromToken } from '../../utils/jwtUtils';
import { LOGIN_SUCCESS, LOGOUT } from '../Actions/authActions.js';

// Stato iniziale
const token = localStorage.getItem('token');
const initialState = {
  user: null,
  token: token,
  isAuthenticated: !!token,
  role: getRoleFromToken(token),
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        role: action.payload.role,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        role: null,
      };

    default:
      return state;
  }
};

export default authReducer;

import { getRoleFromToken } from '../../utils/jwtUtils';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export const loginSuccess = (user, token, role) => ({
  type: LOGIN_SUCCESS,
  payload: { user, token, role },
});

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await fetch('https://localhost:7055/api/Account/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error('Credenziali non valide');
    }

    const data = await response.json();

    const role = getRoleFromToken(data.token);

    localStorage.setItem('token', data.token);
    localStorage.setItem('role', role);

    dispatch(loginSuccess(credentials.email, data.token, role));
  } catch (error) {
    console.error('Errore nel login:', error.message);
  }
};

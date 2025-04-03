// -----OTTENGO LA LISTA DI TUTTI I PUPPY-----

export const FETCH_PUPPIES_REQUEST = 'FETCH_PUPPIES_REQUEST';
export const FETCH_PUPPIES_SUCCESS = 'FETCH_PUPPIES_SUCCESS';
export const FETCH_PUPPIES_FAILURE = 'FETCH_PUPPIES_FAILURE';

export const fetchPuppiesRequest = () => ({
  type: FETCH_PUPPIES_REQUEST,
});

export const fetchPuppiesSuccess = (puppies) => ({
  type: FETCH_PUPPIES_SUCCESS,
  payload: puppies,
});

export const fetchPuppiesFailure = (error) => ({
  type: FETCH_PUPPIES_FAILURE,
  payload: error,
});

export const fetchPuppies = () => {
  return async (dispatch) => {
    dispatch(fetchPuppiesRequest());

    try {
      const response = await fetch('https://localhost:7055/api/Animali', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Errore nella risposta dal server.');
      }

      const data = await response.json();

      if (data.puppies) {
        dispatch(fetchPuppiesSuccess(data.puppies));
      } else {
        dispatch(fetchPuppiesFailure('Nessun puppo trovato.'));
      }
    } catch (error) {
      dispatch(fetchPuppiesFailure(error.message));
    }
  };
};

// ----- OTTENGO UN PUPPY TRAMITE ID-----
export const FETCH_PUPPY_REQUEST = 'FETCH_PUPPY_REQUEST';
export const FETCH_PUPPY_SUCCESS = 'FETCH_PUPPY_SUCCESS';
export const FETCH_PUPPY_FAILURE = 'FETCH_PUPPY_FAILURE';

export const fetchPuppyRequest = () => {
  return { type: FETCH_PUPPY_REQUEST };
};

export const fetchPuppySuccess = (puppy) => {
  return { type: FETCH_PUPPY_SUCCESS, payload: puppy };
};

export const fetchPuppyFailure = (error) => {
  return { type: FETCH_PUPPY_FAILURE, payload: error };
};

export const fetchPuppyById = (puppyId) => {
  return async (dispatch) => {
    dispatch(fetchPuppyRequest());

    try {
      const response = await fetch(
        `https://localhost:7055/api/Animali/${puppyId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Errore nel recupero del puppy.');
      }

      const data = await response.json();
      dispatch(fetchPuppySuccess(data));
    } catch (error) {
      dispatch(fetchPuppyFailure(error.message));
    }
  };
};

// -----AGGIUNTA PUPPY-----

export const ADD_PUPPY_REQUEST = 'ADD_PUPPY_REQUEST';
export const ADD_PUPPY_SUCCESS = 'ADD_PUPPY_SUCCESS';
export const ADD_PUPPY_FAILURE = 'ADD_PUPPY_FAILURE';

export const addPuppyRequest = () => ({
  type: ADD_PUPPY_REQUEST,
});

export const addPuppySuccess = (message) => ({
  type: ADD_PUPPY_SUCCESS,
  payload: message,
});

export const addPuppyFailure = (error) => ({
  type: ADD_PUPPY_FAILURE,
  payload: error,
});

export const addPuppy = (puppyData) => {
  return async (dispatch) => {
    dispatch(addPuppyRequest());

    try {
      // Rimuovo UserId e NumeroMicrochip se non sono presenti nel form
      if (!puppyData.UserId) {
        delete puppyData.UserId;
      }
      if (!puppyData.MicrochipPresente) {
        delete puppyData.NumeroMicrochip;
      }
      const response = await fetch('https://localhost:7055/api/Animali', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(puppyData),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Errore durante l'aggiunta del puppo");
      }

      const data = await response.json();
      console.log(data);

      if (data.message === 'Puppy correctly added!') {
        dispatch(addPuppySuccess('Puppo aggiunto con successo!'));
      } else {
        dispatch(addPuppyFailure("Errore durante l'aggiunta del puppo."));
      }
    } catch (error) {
      dispatch(addPuppyFailure(error.message));
    }
  };
};

// -----MODIFICA PUPPY-----
export const UPDATE_PUPPY_REQUEST = 'UPDATE_PUPPY_REQUEST';
export const UPDATE_PUPPY_SUCCESS = 'UPDATE_PUPPY_SUCCESS';
export const UPDATE_PUPPY_FAILURE = 'UPDATE_PUPPY_FAILURE';

export const updatePuppyRequest = () => ({
  type: UPDATE_PUPPY_REQUEST,
});

export const updatePuppySuccess = (message) => ({
  type: UPDATE_PUPPY_SUCCESS,
  payload: message,
});

export const updatePuppyFailure = (error) => ({
  type: UPDATE_PUPPY_FAILURE,
  payload: error,
});

export const updatePuppy = (puppyId, puppyData) => {
  return async (dispatch) => {
    dispatch(updatePuppyRequest());

    try {
      const cleanPuppyData = { ...puppyData };

      if (!cleanPuppyData.UserId) {
        delete cleanPuppyData.UserId;
      }
      if (!cleanPuppyData.MicrochipPresente) {
        delete cleanPuppyData.NumeroMicrochip;
      }

      const response = await fetch(
        `https://localhost:7055/api/Animali/${puppyId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          body: JSON.stringify(cleanPuppyData),
        }
      );

      if (!response.ok) {
        throw new Error("Errore durante l'aggiornamento del puppy");
      }

      const data = await response.json();

      if (data.message === 'Puppy correctly updated!') {
        dispatch(updatePuppySuccess('Puppy aggiornato con successo!'));
        return true;
      } else {
        dispatch(
          updatePuppyFailure("Errore durante l'aggiornamento del puppy.")
        );
        return false;
      }
    } catch (error) {
      dispatch(updatePuppyFailure(error.message));
      return false;
    }
  };
};

// -----ELIMINAZIONE PUPPY-----
// actions/PuppyActions.js

export const DELETE_PUPPY_REQUEST = 'DELETE_PUPPY_REQUEST';
export const DELETE_PUPPY_SUCCESS = 'DELETE_PUPPY_SUCCESS';
export const DELETE_PUPPY_FAILURE = 'DELETE_PUPPY_FAILURE';

export const deletePuppyRequest = () => {
  return { type: DELETE_PUPPY_REQUEST };
};

export const deletePuppySuccess = (puppyId) => {
  return { type: DELETE_PUPPY_SUCCESS, payload: puppyId };
};

export const deletePuppyFailure = (error) => {
  return { type: DELETE_PUPPY_FAILURE, payload: error };
};

export const deletePuppy = (puppyId) => {
  return async (dispatch) => {
    console.log(puppyId);

    dispatch(deletePuppyRequest());

    try {
      const response = await fetch(
        `https://localhost:7055/api/Animali/${puppyId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete puppy');
      }

      dispatch(deletePuppySuccess(puppyId));
    } catch (error) {
      dispatch(deletePuppyFailure(error.message));
    }
  };
};

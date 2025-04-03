const API_URL = 'https://localhost:7055/api/Cliente';

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message:
        "Si è verificato un errore durante l'elaborazione della richiesta",
    }));
    throw new Error(error.message || 'Qualcosa è andato storto');
  }

  return response.json();
};

export const fetchClienti = async () => {
  try {
    console.log('Recupero di tutti i clienti...');
    const data = await fetchWithAuth(`${API_URL}`);
    console.log('Clienti recuperati:', data);
    return data;
  } catch (error) {
    console.error('Errore durante il recupero dei clienti:', error);
    throw error;
  }
};

export const fetchCliente = async (id) => {
  try {
    console.log(`Recupero del cliente con ID: ${id}`);
    const data = await fetchWithAuth(`${API_URL}/${id}`);
    console.log('Cliente recuperato:', data);
    return data;
  } catch (error) {
    console.error(`Errore durante il recupero del cliente ${id}:`, error);
    throw error;
  }
};

export const addCliente = async (cliente) => {
  try {
    console.log('Dati cliente da aggiungere:', cliente);
    const data = await fetchWithAuth(`${API_URL}`, {
      method: 'POST',
      body: JSON.stringify(cliente),
    });
    console.log('Risposta dal server:', data);
    return data;
  } catch (error) {
    console.error("Errore durante l'aggiunta del cliente:", error);
    throw error;
  }
};

export const updateCliente = async (id, cliente) => {
  try {
    console.log(`Aggiornamento cliente ${id} con dati:`, cliente);
    const data = await fetchWithAuth(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(cliente),
    });
    console.log('Risposta dal server:', data);
    return data;
  } catch (error) {
    console.error(`Errore durante l'aggiornamento del cliente ${id}:`, error);
    throw error;
  }
};

export const deleteCliente = async (id) => {
  try {
    console.log(`Tentativo di eliminazione del cliente con ID: ${id}`);
    await fetchWithAuth(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    console.log(`Cliente ${id} eliminato con successo`);
    return { success: true, id };
  } catch (error) {
    console.error(`Errore durante l'eliminazione del cliente ${id}:`, error);
    throw error;
  }
};

export const searchClienti = async (searchParams) => {
  try {
    const data = await fetchClienti();
    const clienti = data.clienti || [];

    if (!searchParams || Object.keys(searchParams).length === 0) {
      return clienti;
    }

    return clienti.filter((cliente) => {
      let match = true;

      if (searchParams.nome) {
        match =
          match &&
          cliente.nome.toLowerCase().includes(searchParams.nome.toLowerCase());
      }

      if (searchParams.cognome) {
        match =
          match &&
          cliente.cognome
            .toLowerCase()
            .includes(searchParams.cognome.toLowerCase());
      }

      if (searchParams.codiceFiscale) {
        match =
          match &&
          cliente.codiceFiscale &&
          cliente.codiceFiscale
            .toLowerCase()
            .includes(searchParams.codiceFiscale.toLowerCase());
      }

      return match;
    });
  } catch (error) {
    console.error('Errore durante la ricerca dei clienti:', error);
    throw error;
  }
};

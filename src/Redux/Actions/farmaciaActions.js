const API_URL = "https://localhost:7055/api/Farmacia";

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage;

    try {
      const errorJson = JSON.parse(errorText);
      errorMessage =
        errorJson.message || errorJson.title || errorJson.error || errorText;
    } catch {
      errorMessage = errorText;
    }

    console.error("API Error Response:", {
      status: response.status,
      statusText: response.statusText,
      errorMessage: errorMessage,
    });

    throw new Error(
      `HTTP error! Status: ${response.status}. Message: ${errorMessage}`
    );
  }

  return response.json();
};

// SERVIZI PER LE VENDITE
export const getAllVendite = async () => {
  return fetchWithAuth(`${API_URL}/vendite`);
};

export const getVenditaByNumeroRicetta = async (numeroRicetta) => {
  return fetchWithAuth(`${API_URL}/vendite/ricetta/${numeroRicetta}`);
};

export const getVenditaById = async (id) => {
  return fetchWithAuth(`${API_URL}/vendite/id/${id}`);
};

export const getVenditeByFiscalCode = async (fiscalCode) => {
  return fetchWithAuth(`${API_URL}/vendite/utente/${fiscalCode}`);
};

export const getVenditeByProdottoId = async (prodottoId) => {
  return fetchWithAuth(`${API_URL}/vendite/prodotto/${prodottoId}`);
};

export const createVendita = async (venditaData) => {
  try {
    console.log(
      "Creating vendita with data:",
      JSON.stringify(venditaData, null, 2)
    );

    const formattedData = {
      ...venditaData,
      prodottoId: parseInt(venditaData.prodottoId, 10),
    };

    return fetchWithAuth(`${API_URL}/vendite`, {
      method: "POST",
      body: JSON.stringify(formattedData),
    });
  } catch (error) {
    console.error("Errore dettagliato creazione vendita:", error);
    throw error;
  }
};

export const updateVendita = async (id, venditaData) => {
  return fetchWithAuth(`${API_URL}/vendite/${id}`, {
    method: "PUT",
    body: JSON.stringify(venditaData),
  });
};

export const deleteVendita = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/vendite/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 204) {
      return { success: true };
    }

    const text = await response.text();
    return text ? JSON.parse(text) : { success: true };
  } catch (error) {
    console.error(`Error deleting vendita ${id}:`, error);
    throw error;
  }
};

// SERVIZI PER I FORNITORI
export const getAllFornitori = async () => {
  return fetchWithAuth(`${API_URL}/fornitori`);
};

export const getFornitoreById = async (id) => {
  return fetchWithAuth(`${API_URL}/fornitori/${id}`);
};

export const getFornitoreDetailById = async (id) => {
  return fetchWithAuth(`${API_URL}/fornitori/${id}/dettagli`);
};

export const createFornitore = async (fornitoreData) => {
  return fetchWithAuth(`${API_URL}/fornitori`, {
    method: "POST",
    body: JSON.stringify(fornitoreData),
  });
};

export const updateFornitore = async (id, fornitoreData) => {
  return fetchWithAuth(`${API_URL}/fornitori/${id}`, {
    method: "PUT",
    body: JSON.stringify(fornitoreData),
  });
};

export const deleteFornitore = async (id) => {
  return fetchWithAuth(`${API_URL}/fornitori/${id}`, {
    method: "DELETE",
  });
};

export const searchFornitori = async (searchTerm) => {
  return fetchWithAuth(
    `${API_URL}/fornitori/cerca?searchTerm=${encodeURIComponent(searchTerm)}`
  );
};

// SERVIZI PER I PRODOTTI/FARMACI
export const addFarmaco = async (prodottoData) => {
  return fetchWithAuth(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(prodottoData),
  });
};

export const getProdotti = async () => {
  return fetchWithAuth(`${API_URL}`);
};

export const getProdottoById = async (id) => {
  return fetchWithAuth(`${API_URL}/${id}`);
};

export const deleteProdotto = async (id) => {
  return fetchWithAuth(`${API_URL}/${id}`, {
    method: "DELETE",
  });
};

export const updateProdotto = async (id, prodottoData) => {
  return fetchWithAuth(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(prodottoData),
  });
};

export const searchProduct = async (nome) => {
  return fetchWithAuth(`${API_URL}/${encodeURIComponent(nome)}`);
};

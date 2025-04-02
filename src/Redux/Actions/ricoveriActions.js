const API_URL = "https://localhost:7055/api/Ricovero";

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
    const error = await response.json().catch(() => ({
      message: "An error occurred while processing your request",
    }));
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const getAllRicoveri = async () => {
  return fetchWithAuth(`${API_URL}`);
};

export const getActiveRicoveri = async () => {
  return fetchWithAuth(`${API_URL}/attivi`);
};

export const getRicoveroById = async (id) => {
  return fetchWithAuth(`${API_URL}/${id}`);
};

export const searchRicoveri = async (searchParams) => {
  const allRicoveri = await getAllRicoveri();

  if (!searchParams.puppyNome) {
    return allRicoveri;
  }

  return allRicoveri.filter((ricovero) =>
    ricovero.puppyNome
      .toLowerCase()
      .includes(searchParams.puppyNome.toLowerCase())
  );
};

export const createRicovero = async (ricoveroData) => {
  const formattedData = {
    puppyId: parseInt(ricoveroData.puppyId, 10),
    dataInizioRicovero: ricoveroData.dataInizioRicovero,
    descrizione: ricoveroData.descrizione,
    ...(ricoveroData.dataFineRicovero
      ? { dataFineRicovero: ricoveroData.dataFineRicovero }
      : {}),
  };

  console.log("Dati da inviare:", formattedData);

  return fetchWithAuth(`${API_URL}`, {
    method: "POST",
    body: JSON.stringify(formattedData),
  });
};

export const updateRicovero = async (id, ricoveroData) => {
  return fetchWithAuth(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(ricoveroData),
  });
};

export const deleteRicovero = async (id) => {
  try {
    console.log(`Attempting to delete ricovero with ID: ${id}`);
    console.log(`DELETE request to: ${API_URL}/${id}`);

    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "An error occurred while processing your request",
      }));
      throw new Error(error.message || "Something went wrong");
    }

    console.log(`Delete response status: ${response.status}`);
    return { success: true, id };
  } catch (error) {
    console.error(`Error deleting ricovero ${id}:`, error);
    throw error;
  }
};

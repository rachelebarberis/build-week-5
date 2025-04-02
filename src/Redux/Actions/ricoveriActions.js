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
  try {
    console.log("Creating ricovero with data:", ricoveroData);

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(ricoveroData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Server error response:", errorText);
      throw new Error(`Create failed: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error creating ricovero:", error);
    throw error;
  }
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

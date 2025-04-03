const API = "https://localhost:7055/api/visita"; 

export const getAllVisite = async () => {
  try {
    const response = await fetch(`${API}`);
    return response.ok ? await response.json() : [];
  } catch (error) {
    console.error("Errore nel recupero delle visite", error);
    return [];
  }
};

export const getVisitaById = async (id) => {
  try {
    const response = await fetch(`${API}/${id}`);
    if (response.ok) {
      return await response.json();
    } else {
      console.error("Visita non trovata");
      return null;
    }
  } catch (error) {
    console.error("Errore nel recupero della visita", error);
    return null;
  }
};

export const createVisita = async (visita) => {
  try {
    const response = await fetch(`${API}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visita),
    });
    return response.ok;
  } catch (error) {
    console.error("Errore nella creazione della visita", error);
    return false;
  }
};

export const updateVisita = async (id, visita) => {
  try {
    const response = await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(visita),
    });
    return response.ok;
  } catch (error) {
    console.error("Errore nella modifica della visita", error);
    return false;
  }
};

export const deleteVisita = async (id) => {
    try {
      const response = await fetch(`${API}/${id}`, {
        method: "DELETE",
      });
      return response.ok;
    } catch (error) {
      console.error("Errore nell'eliminazione della visita", error);
      return false;
    }
  };
  

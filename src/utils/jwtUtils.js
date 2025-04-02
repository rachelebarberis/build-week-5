export const getRoleFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = token.split('.')[1];
    const decodedPayload = JSON.parse(atob(payload));

    return decodedPayload.role || null;
  } catch (error) {
    console.error('Errore nella decodifica del token:', error);
    return null;
  }
};

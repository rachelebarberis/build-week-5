import React from 'react';
import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div>
      <h2>Accesso Negato</h2>
      <p>Non hai i permessi per accedere a questa pagina.</p>
      <Link to='/dashboard'>Torna alla Dashboard</Link>
    </div>
  );
};

export default NotAuthorized;

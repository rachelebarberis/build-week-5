import { Container, Table } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePuppy, fetchPuppies } from '../Redux/Actions/puppiesActions';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ElencoPuppy = () => {
  const dispatch = useDispatch();
  const { puppies, loading, error } = useSelector((state) => state.puppies);

  const navigate = useNavigate();

  const handleEdit = (puppyId) => {
    navigate(`/puppies/edit/${puppyId}`);
  };

  const handleDelete = (puppyId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo puppy?')) {
      dispatch(deletePuppy(puppyId));
    }
  };

  const handleInfo = (puppyId) => {
    navigate(`/puppies/details/${puppyId}`);
  };

  useEffect(() => {
    dispatch(fetchPuppies());
  }, [dispatch]);

  if (loading) {
    return <div>Caricamento...</div>;
  }

  if (error) {
    return <div>Errore: {error}</div>;
  }

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className='text-center'>Sezione Puppies</h4>
      <div className='d-flex justify-content-end mb-3'>
        <Link className='btn btn-sm btn-outline-dark' to={'/addPuppy'}>
          <i className='bi bi-plus text-black'></i> Aggiungi Puppy
        </Link>
      </div>
      {puppies.length === 0 ? (
        <p className='text-center'>Nessun puppy ancora in lista!</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Razza</th>
              <th>Colore</th>
              <th>Data di Nascita</th>
              <th>Microchip</th>
              <th>N.Microchip</th>
              <th>Proprietario</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {puppies.map((puppy) => (
              <tr key={puppy.puppyId}>
                <td>{puppy.puppyId}</td>
                <td>{puppy.nome}</td>
                <td>{puppy.tipologia}</td>
                <td>{puppy.coloreMantello}</td>
                <td>{puppy.dataNascita}</td>
                <td>{puppy.microchipPresente ? 'Sì' : 'No'}</td>
                <td>
                  {puppy.microchipPresente ? puppy.numeroMicrochip : '---'}
                </td>
                <td>
                  {puppy.user
                    ? `${puppy.user.firstName} ${puppy.user.lastName}`
                    : 'Non disponibile'}
                </td>
                <td>
                  <i
                    className='bi bi-pencil-square'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEdit(puppy.puppyId)}
                  ></i>
                  <i
                    className='bi bi-trash'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleDelete(puppy.puppyId)}
                  ></i>
                  <i
                    className='bi bi-info-square'
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleInfo(puppy.puppyId)}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ElencoPuppy;

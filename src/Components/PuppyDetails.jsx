import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPuppyById } from '../redux/actions/puppiesActions';

const PuppyDetailComponent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedPuppy, loading, error } = useSelector(
    (state) => state.puppies
  );

  useEffect(() => {
    dispatch(fetchPuppyById(id));
  }, [dispatch, id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p className='alert alert-danger'>{error}</p>;
  if (!selectedPuppy)
    return <p className='alert alert-warning'>Puppy non trovato!</p>;
  return (
    <div className='container mt-4'>
      <h3>Dettaglio Puppy</h3>
      <ul className='list-group'>
        <li className='list-group-item'>
          <strong>Nome:</strong> {selectedPuppy.puppy.nome}
        </li>
        <li className='list-group-item'>
          <strong>Tipologia:</strong> {selectedPuppy.puppy.tipologia}
        </li>
        <li className='list-group-item'>
          <strong>Colore Mantello:</strong> {selectedPuppy.puppy.coloreMantello}
        </li>
        <li className='list-group-item'>
          <strong>Data di Nascita:</strong> {selectedPuppy.puppy.dataNascita}
        </li>
        <li className='list-group-item'>
          <strong>Microchip Presente:</strong>{' '}
          {selectedPuppy.puppy.microchipPresente ? 'Sì' : 'No'}
        </li>
        {selectedPuppy.puppy.microchipPresente && (
          <li className='list-group-item'>
            <strong>Numero Microchip:</strong>{' '}
            {selectedPuppy.puppy.numeroMicrochip}
          </li>
        )}
        {selectedPuppy.puppy.userId && (
          <li className='list-group-item'>
            <strong>Proprietario (User ID):</strong>{' '}
            {selectedPuppy.puppy.userId}
          </li>
        )}
      </ul>
      <button
        className='btn btn-primary mt-3'
        onClick={() => navigate('/elencopuppy')}
      >
        Torna all'Elenco
      </button>
    </div>
  );
};

export default PuppyDetailComponent;

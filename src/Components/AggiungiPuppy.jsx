import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPuppy } from '../Redux/Actions/puppiesActions';

const AddPuppyComponent = () => {
  const [nome, setNome] = useState('');
  const [tipologia, setTipologia] = useState('');
  const [coloreMantello, setColoreMantello] = useState('');
  const [dataNascita, setDataNascita] = useState('');
  const [microchipPresente, setMicrochipPresente] = useState(false);
  const [numeroMicrochip, setNumeroMicrochip] = useState('');
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector(
    (state) => state.puppies
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPuppy = {
      Nome: nome,
      Tipologia: tipologia,
      ColoreMantello: coloreMantello,
      DataNascita: dataNascita,
      MicrochipPresente: microchipPresente,
      NumeroMicrochip: numeroMicrochip,
      UserId: userId,
    };

    dispatch(addPuppy(newPuppy));
  };

  return (
    <div className='container'>
      <h4>Aggiungi un nuovo Puppy</h4>
      {error && <div className='alert alert-danger'>{error}</div>}
      {successMessage && (
        <div className='alert alert-success'>{successMessage}</div>
      )}
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Nome</label>
          <input
            type='text'
            className='form-control'
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Tipologia</label>
          <input
            type='text'
            className='form-control'
            value={tipologia}
            onChange={(e) => setTipologia(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Colore Mantello</label>
          <input
            type='text'
            className='form-control'
            value={coloreMantello}
            onChange={(e) => setColoreMantello(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Data di Nascita</label>
          <input
            type='date'
            className='form-control'
            value={dataNascita}
            onChange={(e) => setDataNascita(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Microchip Presente</label>
          <input
            type='checkbox'
            className='form-check-input'
            checked={microchipPresente}
            onChange={(e) => setMicrochipPresente(e.target.checked)}
          />
        </div>
        {microchipPresente && (
          <div className='mb-3'>
            <label className='form-label'>Numero Microchip</label>
            <input
              type='text'
              className='form-control'
              value={numeroMicrochip}
              onChange={(e) => setNumeroMicrochip(e.target.value)}
            />
          </div>
        )}
        <div className='mb-3'>
          <label className='form-label'>User ID (opzionale)</label>
          <input
            type='text'
            className='form-control'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button type='submit' className='btn btn-primary' disabled={loading}>
          {loading ? 'Aggiungendo...' : 'Aggiungi Puppy'}
        </button>
      </form>
    </div>
  );
};

export default AddPuppyComponent;

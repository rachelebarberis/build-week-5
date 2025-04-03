import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePuppy } from '../Redux/Actions/puppiesActions';
import { Modal, Button, Form } from 'react-bootstrap';

const UpdatePuppyModal = ({ show, handleClose, puppy, onPuppyUpdated }) => {
  const { puppies } = useSelector((state) => state.puppies);
  const dispatch = useDispatch();

  const [nome, setNome] = useState('');
  const [tipologia, setTipologia] = useState('');
  const [coloreMantello, setColoreMantello] = useState('');
  const [dataNascita, setDataNascita] = useState('');
  const [microchipPresente, setMicrochipPresente] = useState(false);
  const [numeroMicrochip, setNumeroMicrochip] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (show && puppy) {
      const puppy = puppies.find(
        (puppy) => puppy.puppyId === parseInt(puppy.puppyId)
      );

      if (puppy) {
        setNome(puppy.nome);
        setTipologia(puppy.tipologia);
        setColoreMantello(puppy.coloreMantello);
        setDataNascita(puppy.dataNascita);
        setMicrochipPresente(puppy.microchipPresente);
        setNumeroMicrochip(puppy.numeroMicrochip || '');
        setUserId(puppy.userId || '');
      }
    }
  }, [show, puppy.puppyId, puppies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPuppy = {
      Nome: nome,
      Tipologia: tipologia,
      ColoreMantello: coloreMantello,
      DataNascita: dataNascita,
      MicrochipPresente: microchipPresente,
      NumeroMicrochip: numeroMicrochip,
      UserId: userId,
    };
    const success = await dispatch(updatePuppy(puppy.puppyId, updatedPuppy));

    if (success) {
      onPuppyUpdated();
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Puppy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type='text'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Tipologia</Form.Label>
            <Form.Control
              type='text'
              value={tipologia}
              onChange={(e) => setTipologia(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Colore Mantello</Form.Label>
            <Form.Control
              type='text'
              value={coloreMantello}
              onChange={(e) => setColoreMantello(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Data di Nascita</Form.Label>
            <Form.Control
              type='date'
              value={dataNascita}
              onChange={(e) => setDataNascita(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label>Microchip Presente</Form.Label>
            <Form.Check
              type='checkbox'
              checked={microchipPresente}
              onChange={(e) => setMicrochipPresente(e.target.checked)}
            />
          </Form.Group>

          {microchipPresente && (
            <Form.Group className='mb-3'>
              <Form.Label>Numero Microchip</Form.Label>
              <Form.Control
                type='text'
                value={numeroMicrochip}
                onChange={(e) => setNumeroMicrochip(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className='mb-3'>
            <Form.Label>User ID (opzionale)</Form.Label>
            <Form.Control
              type='text'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>

          <div className='d-flex justify-content-end'>
            <Button variant='secondary' onClick={handleClose} className='me-2'>
              Annulla
            </Button>
            <Button variant='primary' type='submit'>
              Aggiorna Puppy
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePuppyModal;

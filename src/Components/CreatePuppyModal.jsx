import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addPuppy } from '../Redux/Actions/puppiesActions';

const CreatePuppyModal = ({ show, handleClose, onPuppyCreated }) => {
  const [formData, setFormData] = useState({
    nome: '',
    tipologia: '',
    coloreMantello: '',
    dataNascita: '',
    microchipPresente: false,
    numeroMicrochip: '',
    userId: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPuppy = {
      Nome: formData.nome,
      Tipologia: formData.tipologia,
      ColoreMantello: formData.coloreMantello,
      DataNascita: formData.dataNascita,
      MicrochipPresente: formData.microchipPresente,
      NumeroMicrochip: formData.numeroMicrochip,
      UserId: formData.userId,
    };

    // Dispatch per aggiungere il puppy
    console.log(newPuppy);

    await dispatch(addPuppy(newPuppy));

    // Callback per segnare la creazione del puppy
    onPuppyCreated();

    // Reset dei campi del form
    setFormData({
      nome: '',
      tipologia: '',
      coloreMantello: '',
      dataNascita: '',
      microchipPresente: false,
      numeroMicrochip: '',
      userId: '',
    });

    // Chiudiamo la modale
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop='static'>
      <Modal.Header
        closeButton
        className='bg-light'
        style={{ borderBottom: '2px solid #dee2e6' }}
      >
        <div className='w-100 text-center'>
          <Modal.Title>Nuovo Puppy</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className='px-4 py-4'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-4'>
            <Form.Label className='fw-semibold'>Nome</Form.Label>
            <Form.Control
              type='text'
              name='nome'
              value={formData.nome}
              onChange={handleChange}
              required
              className='shadow-sm'
            />
          </Form.Group>

          <Form.Group className='mb-4'>
            <Form.Label className='fw-semibold'>Tipologia</Form.Label>
            <Form.Control
              type='text'
              name='tipologia'
              value={formData.tipologia}
              onChange={handleChange}
              required
              className='shadow-sm'
            />
          </Form.Group>

          <Form.Group className='mb-4'>
            <Form.Label className='fw-semibold'>Colore Mantello</Form.Label>
            <Form.Control
              type='text'
              name='coloreMantello'
              value={formData.coloreMantello}
              onChange={handleChange}
              required
              className='shadow-sm'
            />
          </Form.Group>

          <Form.Group className='mb-4'>
            <Form.Label className='fw-semibold'>Data di Nascita</Form.Label>
            <Form.Control
              type='date'
              name='dataNascita'
              value={formData.dataNascita}
              onChange={handleChange}
              required
              className='shadow-sm'
            />
          </Form.Group>

          <Form.Group className='mb-4'>
            <Form.Label className='fw-semibold'>Microchip Presente</Form.Label>
            <Form.Check
              type='checkbox'
              name='microchipPresente'
              checked={formData.microchipPresente}
              onChange={handleChange}
            />
          </Form.Group>

          {formData.microchipPresente && (
            <Form.Group className='mb-4'>
              <Form.Label className='fw-semibold'>Numero Microchip</Form.Label>
              <Form.Control
                type='text'
                name='numeroMicrochip'
                value={formData.numeroMicrochip}
                onChange={handleChange}
                className='shadow-sm'
              />
            </Form.Group>
          )}

          <Form.Group className='mb-4'>
            <Form.Label className='fw-semibold'>User ID (opzionale)</Form.Label>
            <Form.Control
              type='text'
              name='userId'
              value={formData.userId}
              onChange={handleChange}
              className='shadow-sm'
            />
          </Form.Group>

          <div className='d-flex justify-content-end mt-4'>
            <Button
              variant='outline-secondary'
              onClick={handleClose}
              className='me-2'
            >
              Annulla
            </Button>
            <Button variant='primary' type='submit' className='px-4'>
              Salva
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePuppyModal;

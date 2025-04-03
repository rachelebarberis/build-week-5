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
      const foundPuppy = puppies.find(
        (p) => p.puppyId === parseInt(puppy.puppyId)
      );

      if (puppy) {
        setNome(puppy.nome);
        setTipologia(puppy.tipologia);
        setColoreMantello(puppy.coloreMantello);
        setDataNascita(puppy.dataNascita);
        setMicrochipPresente(puppy.microchipPresente);
        setNumeroMicrochip(puppy.numeroMicrochip || '');
        setUserId(puppy.owner?.userId || '');
      }
    }
  }, [show, puppy?.puppyId, puppies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPuppy = {
      nome: nome,
      tipologia: tipologia,
      coloreMantello: coloreMantello,
      dataNascita: dataNascita,
      microchipPresente: microchipPresente,
    };

    // Aggiunge 'numeroMicrochip' e 'clienteId' solo se presente
    if (numeroMicrochip) {
      updatedPuppy.numeroMicrochip = numeroMicrochip;
    }

    if (clienteId) {
      updatedPuppy.clienteId = clienteId;
    }

    const isModified = Object.keys(updatedPuppy).some(
      (key) => updatedPuppy[key] !== puppy[key]
    );

    if (!isModified) {
      console.log('Nessuna modifica, richiesta non inviata');
      handleClose();
      return;
    }

    const success = await dispatch(updatePuppy(puppy.puppyId, updatedPuppy));

    if (success) {
      onPuppyUpdated();
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#2A4D38' }}>Modifica Puppy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='mb-3'>
            <Form.Label style={{ color: '#2A4D38' }}>Nome</Form.Label>
            <Form.Control
              style={{ color: '#2F855A' }}
              type='text'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label style={{ color: '#2A4D38' }}>Tipologia</Form.Label>
            <Form.Control
              style={{ color: '#2F855A' }}
              type='text'
              value={tipologia}
              onChange={(e) => setTipologia(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label style={{ color: '#2A4D38' }}>
              Colore Mantello
            </Form.Label>
            <Form.Control
              style={{ color: '#2F855A' }}
              type='text'
              value={coloreMantello}
              onChange={(e) => setColoreMantello(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label style={{ color: '#2A4D38' }}>
              Data di Nascita
            </Form.Label>
            <Form.Control
              style={{ color: '#2F855A' }}
              type='date'
              value={dataNascita}
              onChange={(e) => setDataNascita(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className='mb-3'>
            <Form.Label style={{ color: '#2A4D38' }}>
              Microchip Presente
            </Form.Label>
            <Form.Check
              style={{ color: '#2F855A' }}
              type='checkbox'
              checked={microchipPresente}
              onChange={(e) => setMicrochipPresente(e.target.checked)}
            />
          </Form.Group>

          {microchipPresente && (
            <Form.Group className='mb-3'>
              <Form.Label style={{ color: '#2A4D38' }}>
                Numero Microchip
              </Form.Label>
              <Form.Control
                style={{ color: '#2F855A' }}
                type='text'
                value={numeroMicrochip}
                onChange={(e) => setNumeroMicrochip(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className='mb-3'>
            <Form.Label style={{ color: '#2A4D38' }}>
              Nome Proprietario(opzionale)
            </Form.Label>
            <Form.Control
              style={{ color: '#2F855A' }}
              type='text'
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>

          <div className='d-flex justify-content-end'>
            <Button
              variant='outline-muted'
              style={{ color: '##2A4D38', backgroundColor: '#D8E2DC' }}
              onClick={handleClose}
              className='me-2'
            >
              Annulla
            </Button>
            <Button
              variant='outline-muted'
              style={{ backgroundColor: '#2F855A', color: '#D8E2DC' }}
              type='submit'
            >
              Aggiorna Puppy
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePuppyModal;

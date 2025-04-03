import React, { useEffect } from 'react';
import { Modal, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPuppyById } from '../../Redux/Actions/puppiesActions';

const ViewPuppyModal = ({ show, handleClose, puppy }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  // Assicurati che puppy contenga direttamente il cucciolo e non un oggetto con una proprietà puppy
  const selectedPuppy = puppy;

  useEffect(() => {
    if (show && id) {
      dispatch(fetchPuppyById(id));
    }
  }, [show, id, dispatch]);

  if (!selectedPuppy) {
    return <div>Loading...</div>; // Aggiungi un messaggio di caricamento
  }

  return (
    <Modal show={show} onHide={handleClose} centered backdrop='static'>
      <Modal.Header closeButton>
        <Modal.Title>Dettagli Cucciolo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className='mb-4'>
          <Col md={6}>
            <Card className='shadow-sm'>
              <Card.Header className='bg-light'>Nome</Card.Header>
              <Card.Body>
                <Card.Text>{selectedPuppy.nome || 'Non specificato'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className='shadow-sm'>
              <Card.Header className='bg-light'>Tipologia</Card.Header>
              <Card.Body>
                <Card.Text>
                  {selectedPuppy.tipologia || 'Non specificata'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className='mb-4'>
          <Col md={6}>
            <Card className='shadow-sm'>
              <Card.Header className='bg-light'>Colore Mantello</Card.Header>
              <Card.Body>
                <Card.Text>
                  {selectedPuppy.coloreMantello || 'Non specificato'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className='shadow-sm'>
              <Card.Header className='bg-light'>Data di Nascita</Card.Header>
              <Card.Body>
                <Card.Text>
                  {selectedPuppy.dataNascita || 'Non specificata'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {selectedPuppy.microchipPresente && (
          <Card className='shadow-sm mb-4'>
            <Card.Header className='bg-light'>Microchip</Card.Header>
            <Card.Body>
              <Card.Text>
                Numero Microchip: {selectedPuppy.numeroMicrochip}
              </Card.Text>
            </Card.Body>
          </Card>
        )}

        {selectedPuppy.owner && (
          <Card className='shadow-sm mb-4'>
            <Card.Header className='bg-light'>Proprietario</Card.Header>
            <Card.Body>
              <Card.Text>
                {selectedPuppy.owner.firstName} {selectedPuppy.owner.lastName}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPuppyModal;

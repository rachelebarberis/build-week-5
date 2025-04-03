import React, { useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPuppyById } from "../Redux/Actions/puppiesActions";

const ViewPuppyModal = ({ show, handleClose, puppy }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

<<<<<<< HEAD
  const selectedPuppy = puppy;

=======
>>>>>>> origin/rachele
  useEffect(() => {
    if (show && id) {
      dispatch(fetchPuppyById(id));
    }
  }, [show, id, dispatch]);

<<<<<<< HEAD
  if (!selectedPuppy) {
=======
  if (!puppy) {
>>>>>>> origin/rachele
    return <div>Loading...</div>;
  }

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#2A4D38" }}>
          Dettagli Cucciolo
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
<<<<<<< HEAD
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

        {selectedPuppy.cliente && (
          <Card className='shadow-sm mb-4'>
            <Card.Header className='bg-light'>Proprietario</Card.Header>
            <Card.Body>
              <Card.Text>
                {selectedPuppy.cliente.nome} {selectedPuppy.cliente.cognome}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
=======
        <Card className="border-0">
          <Card.Body className="text-center">
            <h4 className="text-center mb-3" style={{ color: "#2A4D38" }}>
              {puppy.nome || "Nome non specificato"}
            </h4>
            <hr></hr>
            <div>
              <p>
                <span style={{ color: "#2A4D38" }}>Tipologia: </span>
                <span style={{ color: "#2F855A" }}>
                  {puppy.tipologia || "Non specificata"}
                </span>
              </p>
              <p>
                <span style={{ color: "#2A4D38" }}>Colore Mantello: </span>
                <span style={{ color: "#2F855A" }}>
                  {puppy.coloreMantello || "Non specificato"}
                </span>
              </p>
              <p>
                <span style={{ color: "#2A4D38" }}>Data di Nascita: </span>
                <span style={{ color: "#2F855A" }}>
                  {puppy.dataNascita || "Non specificata"}
                </span>
              </p>
              {puppy.microchipPresente && (
                <p>
                  <span style={{ color: "#2A4D38" }}>Numero Microchip: </span>
                  <span style={{ color: "#2F855A" }}>
                    {puppy.numeroMicrochip || "Non disponibile"}
                  </span>
                </p>
              )}
              {puppy.owner && (
                <p>
                  <span style={{ color: "#2A4D38" }}>Proprietario: </span>
                  <span style={{ color: "#2F855A" }}>
                    {puppy.owner.firstName} {puppy.owner.lastName}
                  </span>
                </p>
              )}
            </div>
          </Card.Body>
        </Card>
>>>>>>> origin/rachele
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPuppyModal;

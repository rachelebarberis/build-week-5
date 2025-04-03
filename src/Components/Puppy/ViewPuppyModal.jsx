import React, { useEffect } from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPuppyById } from "../../Redux/Actions/puppiesActions";

const ViewPuppyModal = ({ show, handleClose, puppy }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (show && id) {
      dispatch(fetchPuppyById(id));
    }
  }, [show, id, dispatch]);

  if (!puppy) {
    return <div>Loading...</div>;
  }

  // formatta le date
  const formatDate = (dateString) => {
    if (!dateString) return "Non specificata";
    return new Date(dateString).toLocaleDateString("it-IT");
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Dettagli Cucciolo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">Nome</Card.Header>
              <Card.Body>
                <Card.Text>{puppy.nome || "Non specificato"}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">Tipologia</Card.Header>
              <Card.Body>
                <Card.Text>{puppy.tipologia || "Non specificata"}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">Colore Mantello</Card.Header>
              <Card.Body>
                <Card.Text>
                  {puppy.coloreMantello || "Non specificato"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Header className="bg-light">Data di Nascita</Card.Header>
              <Card.Body>
                <Card.Text>{formatDate(puppy.dataNascita)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {puppy.microchipPresente && (
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-light">Microchip</Card.Header>
            <Card.Body>
              <Card.Text>
                Numero Microchip: {puppy.numeroMicrochip || "Non specificato"}
              </Card.Text>
            </Card.Body>
          </Card>
        )}

        {/* Sezione proprietario - sempre visualizzata se c'è un clienteId */}
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-light">Proprietario</Card.Header>
          <Card.Body>
            {puppy.cliente ? (
              <Row>
                <Col md={6}>
                  <p>
                    <strong>Nome:</strong>{" "}
                    {puppy.cliente.nome || "Non specificato"}
                  </p>
                  <p>
                    <strong>Cognome:</strong>{" "}
                    {puppy.cliente.cognome || "Non specificato"}
                  </p>
                  <p>
                    <strong>ID Cliente:</strong>{" "}
                    {puppy.cliente.id || "Non specificato"}
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Codice Fiscale:</strong>{" "}
                    {puppy.cliente.codiceFiscale || "Non specificato"}
                  </p>
                  <p>
                    <strong>Indirizzo:</strong>{" "}
                    {puppy.cliente.indirizzo || "Non specificato"}
                  </p>
                  <p>
                    <strong>Data di Nascita:</strong>{" "}
                    {formatDate(puppy.cliente.dataDiNascita)}
                  </p>
                </Col>
              </Row>
            ) : puppy.clienteId ? (
              <p>
                <strong>ID Cliente:</strong> {puppy.clienteId}
                <br />
                <span className="text-muted">
                  Dettagli completi del proprietario non disponibili
                </span>
              </p>
            ) : (
              <p>Nessun proprietario associato</p>
            )}
          </Card.Body>
        </Card>
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

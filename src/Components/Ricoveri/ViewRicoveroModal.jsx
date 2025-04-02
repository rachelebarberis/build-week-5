import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Alert, ListGroup } from "react-bootstrap";
import { getRicoveroById } from "../../Redux/Actions/ricoveriActions";

const ViewRicoveroModal = ({ show, handleClose, ricoveroId }) => {
  const [ricovero, setRicovero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && ricoveroId) {
      fetchRicoveroData();
    }
  }, [show, ricoveroId]);

  const fetchRicoveroData = async () => {
    setLoading(true);
    try {
      const data = await getRicoveroById(ricoveroId);
      setRicovero(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching ricovero details:", err);
      setError("Errore nel caricamento dei dettagli del ricovero");
    } finally {
      setLoading(false);
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Non specificata";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT");
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Dettagli Ricovero</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        ) : ricovero ? (
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>ID Ricovero:</strong> {ricovero.ricoveroId}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Nome Puppy:</strong> {ricovero.puppyNome}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>ID Puppy:</strong> {ricovero.puppyId}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Data Inizio Ricovero:</strong>{" "}
              {formatDate(ricovero.dataInizioRicovero)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Descrizione:</strong> {ricovero.descrizione}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Data Fine Ricovero:</strong>{" "}
              {formatDate(ricovero.dataFineRicovero)}
            </ListGroup.Item>
          </ListGroup>
        ) : (
          <p>Nessun dato disponibile</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewRicoveroModal;

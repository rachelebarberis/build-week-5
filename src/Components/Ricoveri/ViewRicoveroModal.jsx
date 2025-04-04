import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Spinner, Alert } from "react-bootstrap";
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
      console.error("Errore caricamento ricovero:", err);
      setError("Errore nel caricamento dei dettagli del ricovero.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "Non specificata";
    const date = new Date(dateStr);
    return date.toLocaleDateString("it-IT");
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#2A4D38" }}>
          Dettagli Ricovero
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        ) : ricovero ? (
          <Card className="border-0">
            <Card.Body className="text-center">
              <h4 className="text-center mb-3" style={{ color: "#2A4D38" }}>
                {ricovero.puppyNome || "Nome Cucciolo non disponibile"}
              </h4>
              <hr />

              <p>
                <span style={{ color: "#2A4D38" }}>Data Inizio Ricovero: </span>
                <span style={{ color: "#2F855A" }}>
                  {formatDate(ricovero.dataInizioRicovero)}
                </span>
              </p>

              <p>
                <span style={{ color: "#2A4D38" }}>Data Fine Ricovero: </span>
                <span style={{ color: "#2F855A" }}>
                  {ricovero.dataFineRicovero
                    ? formatDate(ricovero.dataFineRicovero)
                    : "Ancora in ricovero"}
                </span>
              </p>

              <p>
                <span style={{ color: "#2A4D38" }}>Descrizione: </span>
                <span style={{ color: "#2F855A", whiteSpace: "pre-wrap" }}>
                  {ricovero.descrizione || "Nessuna descrizione disponibile"}
                </span>
              </p>

              <hr />
              <p className="text-muted small">
                <i className="bi bi-info-circle me-1" />
                ID Ricovero: {ricovero.ricoveroId}
              </p>
            </Card.Body>
          </Card>
        ) : (
          <p className="text-center text-muted">
            Nessun dato disponibile sul ricovero.
          </p>
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

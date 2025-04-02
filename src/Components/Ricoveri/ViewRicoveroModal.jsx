import React, { useState, useEffect } from "react";
import { Modal, Button, Spinner, Alert, Row, Col, Card } from "react-bootstrap";
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

  const formatDate = (dateString) => {
    if (!dateString) return "Non specificata";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT");
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header
        closeButton
        className="bg-light"
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <div className="w-100 text-end">
          <Modal.Title>Dettagli Ricovero</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        {error && (
          <Alert variant="danger" className="mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        ) : ricovero ? (
          <>
            <div className="mb-4 p-3 bg-light rounded border">
              <h6 className="mb-1">Puppy:</h6>
              <div className="fs-5 fw-bold">
                {ricovero.puppyNome || "Puppy"}
                <span className="ms-2 badge bg-secondary"></span>
              </div>
            </div>

            <Row className="mb-4">
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-light">
                    <i className="bi bi-calendar-plus me-2"></i>
                    Data Inizio Ricovero
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="fs-5">
                      {formatDate(ricovero.dataInizioRicovero)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-light">
                    <i className="bi bi-calendar-check me-2"></i>
                    Data Fine Ricovero
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="fs-5">
                      {ricovero.dataFineRicovero ? (
                        formatDate(ricovero.dataFineRicovero)
                      ) : (
                        <span className="badge bg-purple text-white px-3 py-2">
                          Ancora in ricovero
                        </span>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-light">
                <i className="bi bi-card-text me-2"></i>
                Descrizione
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                  {ricovero.descrizione || "Nessuna descrizione disponibile"}
                </Card.Text>
              </Card.Body>
            </Card>

            <div className="text-muted small text-center">
              <i className="bi bi-info-circle me-1"></i>
              ID Ricovero: {ricovero.ricoveroId}
            </div>
          </>
        ) : (
          <p className="text-center text-muted">Nessun dato disponibile</p>
        )}
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button variant="primary" onClick={handleClose} className="px-4">
          <i className="bi bi-x-circle me-1"></i>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewRicoveroModal;

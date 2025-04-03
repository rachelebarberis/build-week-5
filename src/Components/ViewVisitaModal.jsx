import React, { useState, useEffect } from "react";
import { Modal, Button, Card, Row, Col } from "react-bootstrap";
import { getVisitaById } from "../Redux/Actions/VisitaAction";

const ViewVisitaModal = ({ show, handleClose, visitaId }) => {
  const [visita, setVisita] = useState(null);

  useEffect(() => {
    if (show && visitaId) {
      fetchVisitaData();
    }
  }, [show, visitaId]);

  const fetchVisitaData = async () => {
    try {
      const data = await getVisitaById(visitaId);
      setVisita(data);
    } catch (err) {
      console.error("Errore nel caricamento dei dettagli della visita:", err);
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
          <Modal.Title>Dettagli Visita</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        {visita ? (
          <>
            <div className="mb-4 p-3 bg-light rounded border">
              <h6 className="mb-1">Puppy:</h6>
              <div className="fs-5 fw-bold">{visita.puppyNome || "Puppy"}</div>
            </div>

            <Row className="mb-4">
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-light">
                    <i className="bi bi-calendar-plus me-2"></i>
                    Data Visita
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="fs-5">
                      {formatDate(visita.dataVisita)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="shadow-sm h-100">
                  <Card.Header className="bg-light">
                    <i className="bi bi-calendar-check me-2"></i>
                    Obiettivo Esame
                  </Card.Header>
                  <Card.Body>
                    <Card.Text className="fs-5">
                      {visita.obiettivoEsame || "Non specificato"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-light">
                <i className="bi bi-card-text me-2"></i>
                Descrizione Cura
              </Card.Header>
              <Card.Body>
                <Card.Text style={{ whiteSpace: "pre-wrap" }}>
                  {visita.descrizioneCura || "Nessuna descrizione disponibile"}
                </Card.Text>
              </Card.Body>
            </Card>

            <div className="text-muted small text-center">
              <i className="bi bi-info-circle me-1"></i>
              ID Visita: {visita.visitaId}
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

export default ViewVisitaModal;

import React from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";

const EditFornitoreModal = ({
  show,
  handleClose,
  handleSubmit,
  fornitore,
  handleInputChange,
  validated,
  loading,
  error,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Modal.Header
        closeButton
        className="bg-light"
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <div className="w-100 text-center">
          <Modal.Title id="verde">
            <i className="bi bi-pencil-square me-2"></i>
            Modifica Fornitore
          </Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        {error && (
          <Alert variant="danger" className="mb-4 rounded-3">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3"
            style={{
              width: "70px",
              height: "70px",
              border: "2px dashed #2A4D38",
            }}
          >
            <i className="bi bi-truck fs-2" id="verde"></i>
          </div>
          <p className="text-muted mb-0">Modifica i dati del fornitore</p>
        </div>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-building me-2" id="verde"></i>
              Nome Azienda
            </Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={fornitore.nome}
              onChange={handleInputChange}
              required
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un nome valido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-telephone me-2" id="verde"></i>
              Recapito
            </Form.Label>
            <Form.Control
              type="text"
              name="recapito"
              value={fornitore.recapito}
              onChange={handleInputChange}
              required
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un recapito valido.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Numero di telefono o indirizzo email per contattare il fornitore
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-geo-alt me-2" id="verde"></i>
              Indirizzo
            </Form.Label>
            <Form.Control
              type="text"
              name="indirizzo"
              value={fornitore.indirizzo}
              onChange={handleInputChange}
              required
              className="shadow-sm"
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un indirizzo valido.
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="me-2"
              disabled={loading}
            >
              <i className="bi bi-x-circle me-1"></i>
              Annulla
            </Button>
            <Button
              variant="success"
              type="submit"
              className="px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Aggiornamento...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-1"></i>
                  Salva Modifiche
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditFornitoreModal;

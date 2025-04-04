import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const AddClienteModal = ({
  show,
  handleClose,
  handleSubmit,
  cliente,
  handleInputChange,
  validated,
}) => {
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      size="lg"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>
          <i className="bi bi-person-plus-fill me-2 text-success"></i>
          <span id="verde">Aggiungi Nuovo Cliente</span>
        </Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Body className="px-4 py-4">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label id="verde" className="fw-semibold">
                  <i className="bi bi-person me-2"></i>Nome
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  value={cliente.nome}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                  placeholder="Inserisci il nome"
                  className="border-success-subtle"
                />
                <Form.Control.Feedback type="invalid">
                  Inserisci un nome valido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label id="verde" className="fw-semibold">
                  <i className="bi bi-person me-2"></i>Cognome
                </Form.Label>
                <Form.Control
                  type="text"
                  name="cognome"
                  value={cliente.cognome}
                  onChange={handleInputChange}
                  required
                  maxLength={100}
                  placeholder="Inserisci il cognome"
                  className="border-success-subtle"
                />
                <Form.Control.Feedback type="invalid">
                  Inserisci un cognome valido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-card-text me-2"></i>Codice Fiscale
            </Form.Label>
            <Form.Control
              type="text"
              name="codiceFiscale"
              value={cliente.codiceFiscale}
              onChange={handleInputChange}
              required
              minLength={16}
              maxLength={16}
              placeholder="Inserisci il codice fiscale (16 caratteri)"
              className="border-success-subtle"
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un codice fiscale valido (16 caratteri).
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label id="verde" className="fw-semibold">
                  <i className="bi bi-calendar-date me-2"></i>Data di Nascita
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dataDiNascita"
                  value={cliente.dataDiNascita}
                  onChange={handleInputChange}
                  required
                  className="border-success-subtle"
                />
                <Form.Control.Feedback type="invalid">
                  Inserisci una data di nascita valida.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label id="verde" className="fw-semibold">
                  <i className="bi bi-geo-alt me-2"></i>Indirizzo
                </Form.Label>
                <Form.Control
                  type="text"
                  name="indirizzo"
                  value={cliente.indirizzo}
                  onChange={handleInputChange}
                  required
                  maxLength={200}
                  placeholder="Inserisci l'indirizzo completo"
                  className="border-success-subtle"
                />
                <Form.Control.Feedback type="invalid">
                  Inserisci un indirizzo valido.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="bg-light">
          <Button
            variant="outline-secondary"
            onClick={handleClose}
            className="px-4"
          >
            <i className="bi bi-x-circle me-2"></i>
            Annulla
          </Button>
          <Button variant="success" type="submit" className="px-4">
            <i className="bi bi-check-circle me-2"></i>
            Salva Cliente
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddClienteModal;

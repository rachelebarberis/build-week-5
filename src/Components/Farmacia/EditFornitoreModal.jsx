import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditFornitoreModal = ({
  show,
  handleClose,
  handleSubmit,
  fornitore,
  handleInputChange,
  validated,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Fornitore</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={fornitore.nome}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un nome valido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Recapito</Form.Label>
            <Form.Control
              type="text"
              name="recapito"
              value={fornitore.recapito}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un recapito valido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              type="text"
              name="indirizzo"
              value={fornitore.indirizzo}
              onChange={handleInputChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un indirizzo valido.
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="primary" type="submit">
            Salva Modifiche
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditFornitoreModal;

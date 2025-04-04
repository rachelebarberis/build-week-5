import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

const AddClienteModal = ({
  show,
  handleClose,
  handleSubmit,
  cliente,
  handleInputChange,
  validated,
}) => {
  const [ageError, setAgeError] = useState(false);

  const checkAge = (date) => {
    if (!date) {
      setAgeError(true);
      return false;
    }

    const birthDate = new Date(date);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    const isValid = age >= 18;
    setAgeError(!isValid);
    return isValid;
  };

  const handleDateChange = (e) => {
    handleInputChange(e);
    checkAge(e.target.value);
  };

  const onSubmit = (e) => {
    if (!checkAge(cliente.dataDiNascita)) {
      e.preventDefault();
      return;
    }
    handleSubmit(e);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Cliente</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={onSubmit}>
        <Modal.Body>
          {ageError && (
            <Alert variant="danger">
              Il cliente deve avere almeno 18 anni.
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={cliente.nome}
              onChange={handleInputChange}
              required
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un nome valido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              name="cognome"
              value={cliente.cognome}
              onChange={handleInputChange}
              required
              maxLength={100}
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un cognome valido.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Codice Fiscale</Form.Label>
            <Form.Control
              type="text"
              name="codiceFiscale"
              value={cliente.codiceFiscale}
              onChange={handleInputChange}
              required
              minLength={16}
              maxLength={16}
            />
            <Form.Control.Feedback type="invalid">
              Inserisci un codice fiscale valido (16 caratteri).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data di Nascita</Form.Label>
            <Form.Control
              type="date"
              name="dataDiNascita"
              value={cliente.dataDiNascita}
              onChange={handleDateChange}
              required
              isInvalid={ageError}
            />
            <Form.Control.Feedback type="invalid">
              Il cliente deve avere almeno 18 anni.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Indirizzo</Form.Label>
            <Form.Control
              type="text"
              name="indirizzo"
              value={cliente.indirizzo}
              onChange={handleInputChange}
              required
              maxLength={200}
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
          <Button variant="primary" type="submit" disabled={ageError}>
            Salva
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddClienteModal;

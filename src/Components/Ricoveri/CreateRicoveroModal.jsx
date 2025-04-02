import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { createRicovero } from "../../Redux/Actions/ricoveriActions";

const CreateRicoveroModal = ({ show, handleClose, onRicoveroCreated }) => {
  const [formData, setFormData] = useState({
    puppyId: "",
    dataInizioRicovero: "",
    descrizione: "",
    dataFineRicovero: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Create a new object with properly formatted data
      const formattedData = {
        puppyId: parseInt(formData.puppyId, 10), // Convert to integer
        dataInizioRicovero: formData.dataInizioRicovero, // Keep date format as is
        descrizione: formData.descrizione,
        // Only include dataFineRicovero if it has a value
        ...(formData.dataFineRicovero
          ? { dataFineRicovero: formData.dataFineRicovero }
          : {}),
      };

      console.log("Sending data:", formattedData);
      await createRicovero(formattedData);

      handleClose();
      onRicoveroCreated();

      // Reset form
      setFormData({
        puppyId: "",
        dataInizioRicovero: "",
        descrizione: "",
        dataFineRicovero: "",
      });
    } catch (err) {
      setError("Errore durante la creazione del ricovero: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Nuovo Ricovero</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ID Puppy</Form.Label>
            <Form.Control
              type="number"
              name="puppyId"
              value={formData.puppyId}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data Inizio Ricovero</Form.Label>
            <Form.Control
              type="date"
              name="dataInizioRicovero"
              value={formData.dataInizioRicovero}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrizione</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descrizione"
              value={formData.descrizione}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Data Fine Ricovero (opzionale)</Form.Label>
            <Form.Control
              type="date"
              name="dataFineRicovero"
              value={formData.dataFineRicovero}
              onChange={handleChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Annulla
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Creazione in corso..." : "Crea Ricovero"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateRicoveroModal;

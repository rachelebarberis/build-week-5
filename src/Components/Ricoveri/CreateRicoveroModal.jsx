import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { createRicovero } from "../../Redux/Actions/ricoveriActions";

const CreateRicoveroModal = ({ show, handleClose, onRicoveroCreated }) => {
  const [formData, setFormData] = useState({
    puppyId: "",
    dataInizioRicovero: "",
    descrizione: "",
    dataFineRicovero: "",
  });

  const [puppies, setPuppies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      fetchPuppies();
    }
  }, [show]);

  const fetchPuppies = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("https://localhost:7055/api/Animali", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.puppies) {
        setPuppies(data.puppies);
      } else {
        throw new Error("Formato risposta non valido");
      }
    } catch (error) {
      console.error("Errore nel caricamento dei puppy:", error);
      setError("Errore nel caricamento dei puppy: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createRicovero(formData);
      onRicoveroCreated();
      setFormData({
        puppyId: "",
        dataInizioRicovero: "",
        descrizione: "",
        dataFineRicovero: "",
      });
      setError(null);
    } catch (err) {
      setError(`Errore nella creazione del ricovero: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuovo Ricovero</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Puppy</Form.Label>
            <Form.Select
              name="puppyId"
              value={formData.puppyId}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un puppy</option>
              {puppies.map((puppy) => (
                <option key={puppy.puppyId} value={puppy.puppyId}>
                  {puppy.nome} ({puppy.tipologia})
                </option>
              ))}
            </Form.Select>
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
              {loading ? "Salvataggio..." : "Salva"}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateRicoveroModal;

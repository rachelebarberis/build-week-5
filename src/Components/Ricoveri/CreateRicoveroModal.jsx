import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
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
  const [fetchingPuppies, setFetchingPuppies] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      fetchPuppies();
    }
  }, [show]);

  const fetchPuppies = async () => {
    try {
      setFetchingPuppies(true);
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
    } finally {
      setFetchingPuppies(false);
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
      const ricoveroData = {
        puppyId: parseInt(formData.puppyId, 10),
        dataInizioRicovero: formData.dataInizioRicovero,
        descrizione: formData.descrizione,
        dataFineRicovero: formData.dataFineRicovero || undefined,
      };

      await createRicovero(ricoveroData);
      onRicoveroCreated();
      setFormData({
        puppyId: "",
        dataInizioRicovero: "",
        descrizione: "",
        dataFineRicovero: "",
      });
      setError(null);
      handleClose();
    } catch (err) {
      console.error("Errore completo:", err);
      setError(`Errore nella creazione del ricovero: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header
        closeButton
        className="bg-light"
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <div className="w-100 text-center">
          <Modal.Title>Nuovo Ricovero</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        {error && (
          <Alert variant="danger" className="mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="bi bi-tag me-2"></i>
              Puppy
            </Form.Label>
            {fetchingPuppies ? (
              <div className="text-center py-3">
                <Spinner animation="border" size="sm" className="me-2" />
                Caricamento puppies...
              </div>
            ) : (
              <Form.Select
                name="puppyId"
                value={formData.puppyId}
                onChange={handleChange}
                required
                className="form-select-sm shadow-sm"
              >
                <option value="">Seleziona un puppy</option>
                {puppies.map((puppy) => (
                  <option key={puppy.puppyId} value={puppy.puppyId}>
                    {puppy.nome} ({puppy.tipologia})
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Data Inizio Ricovero
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dataInizioRicovero"
                  value={formData.dataInizioRicovero}
                  onChange={handleChange}
                  required
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
                  <i className="bi bi-calendar-check me-2"></i>
                  Data Fine (opzionale)
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dataFineRicovero"
                  value={formData.dataFineRicovero}
                  onChange={handleChange}
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">
              <i className="bi bi-card-text me-2"></i>
              Descrizione
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="descrizione"
              value={formData.descrizione}
              onChange={handleChange}
              required
              placeholder="Inserisci una descrizione dettagliata del ricovero..."
              className="shadow-sm"
            />
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
              variant="primary"
              type="submit"
              disabled={loading}
              className="px-4"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Salvataggio...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-1"></i>
                  Salva
                </>
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateRicoveroModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addPuppy } from "../../Redux/Actions/puppiesActions";

const CreatePuppyModal = ({ show, handleClose, onPuppyCreated }) => {
  const [formData, setFormData] = useState({
    nome: "",
    tipologia: "",
    coloreMantello: "",
    dataNascita: "",
    microchipPresente: false,
    numeroMicrochip: "",
    clienteId: "",
  });

  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      loadClienti();
    }
  }, [show]);

  const loadClienti = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("https://localhost:7055/api/Cliente", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Errore ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      if (data && data.clienti) {
        setClienti(data.clienti);
      }

      setError(null);
    } catch (err) {
      setError("Errore nel caricamento dei clienti: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newPuppy = {
        Nome: formData.nome,
        Tipologia: formData.tipologia,
        ColoreMantello: formData.coloreMantello,
        DataNascita: formData.dataNascita,
        MicrochipPresente: formData.microchipPresente,
        NumeroMicrochip: formData.numeroMicrochip,
        ClienteId: formData.clienteId || null,
      };

      await dispatch(addPuppy(newPuppy));
      onPuppyCreated();

      setFormData({
        nome: "",
        tipologia: "",
        coloreMantello: "",
        dataNascita: "",
        microchipPresente: false,
        numeroMicrochip: "",
        clienteId: "",
      });

      handleClose();
    } catch (err) {
      setError("Errore durante la creazione del puppy: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <div className="w-100 text-center">
          <Modal.Title id="verde">Nuovo Puppy</Modal.Title>
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
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-tag me-2"></i>
              Nome
            </Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-tags me-2"></i>
              Razza
            </Form.Label>
            <Form.Control
              type="text"
              name="tipologia"
              value={formData.tipologia}
              onChange={handleChange}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-palette me-2"></i>
              Colore Mantello
            </Form.Label>
            <Form.Control
              type="text"
              name="coloreMantello"
              value={formData.coloreMantello}
              onChange={handleChange}
              required
              className="shadow-sm"
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label id="verde" className="fw-semibold">
                  <i className="bi bi-calendar-date me-2"></i>
                  Data di Nascita
                </Form.Label>
                <Form.Control
                  type="date"
                  name="dataNascita"
                  value={formData.dataNascita}
                  onChange={handleChange}
                  required
                  className="shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-cpu me-2"></i>
              Microchip Presente
            </Form.Label>
            <Form.Check
              type="checkbox"
              name="microchipPresente"
              checked={formData.microchipPresente}
              onChange={handleChange}
            />
          </Form.Group>

          {formData.microchipPresente && (
            <Form.Group className="mb-4">
              <Form.Label id="verde" className="fw-semibold">
                <i className="bi bi-upc-scan me-2"></i>
                Numero Microchip
              </Form.Label>
              <Form.Control
                type="text"
                name="numeroMicrochip"
                value={formData.numeroMicrochip}
                onChange={handleChange}
                className="shadow-sm"
              />
            </Form.Group>
          )}

          <Form.Group className="mb-4">
            <Form.Label id="verde" className="fw-semibold">
              <i className="bi bi-person me-2"></i>
              Proprietario
            </Form.Label>
            {loading && clienti.length === 0 ? (
              <div className="text-center">
                <Spinner animation="border" size="sm" className="me-2" />
                Caricamento clienti...
              </div>
            ) : error && clienti.length === 0 ? (
              <div className="text-danger">{error}</div>
            ) : (
              <Form.Select
                name="clienteId"
                value={formData.clienteId}
                onChange={handleChange}
                className="shadow-sm"
              >
                <option value="">Seleziona un proprietario (opzionale)</option>
                {clienti.map((cliente) => (
                  <option key={cliente.id} value={cliente.id}>
                    {cliente.codiceFiscale} ({cliente.nome} {cliente.cognome})
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="me-2"
              disabled={loading}
            >
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
                  Salvataggio...
                </>
              ) : (
                "Salva"
              )}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePuppyModal;

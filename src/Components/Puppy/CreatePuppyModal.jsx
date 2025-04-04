import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
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
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <div className="w-100 text-center">
          <Modal.Title>Nuovo Puppy</Modal.Title>
        </div>
      </Modal.Header>
      <Modal.Body className="px-4 py-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Nome</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Tipologia</Form.Label>
            <Form.Control
              type="text"
              name="tipologia"
              value={formData.tipologia}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Colore Mantello</Form.Label>
            <Form.Control
              type="text"
              name="coloreMantello"
              value={formData.coloreMantello}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Data di Nascita</Form.Label>
            <Form.Control
              type="date"
              name="dataNascita"
              value={formData.dataNascita}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Microchip Presente</Form.Label>
            <Form.Check
              type="checkbox"
              name="microchipPresente"
              checked={formData.microchipPresente}
              onChange={handleChange}
            />
          </Form.Group>

          {formData.microchipPresente && (
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Numero Microchip</Form.Label>
              <Form.Control
                type="text"
                name="numeroMicrochip"
                value={formData.numeroMicrochip}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Proprietario</Form.Label>
            {loading ? (
              <div className="text-center">
                <span className="spinner-border spinner-border-sm me-2"></span>
                Caricamento clienti...
              </div>
            ) : error ? (
              <div className="text-danger">{error}</div>
            ) : (
              <Form.Select
                name="clienteId"
                value={formData.clienteId}
                onChange={handleChange}
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
            >
              Annulla
            </Button>
            <Button variant="primary" type="submit" className="px-4">
              Salva
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreatePuppyModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
import { createVendita } from "../../Redux/Actions/farmaciaActions";

const CreateVenditaModal = ({
  show,
  handleClose,
  onVenditaCreated,
  prodottoId = null,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    prodottoId: "",
    customerId: "",
    ricettaMedica: "false",
    numeroRicettaMedica: "",
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (show) {
      setFormData({
        prodottoId: prodottoId || "",
        customerId: "",
        ricettaMedica: "false",
        numeroRicettaMedica: "",
      });
      setValidated(false);
      setError(null);
    }
  }, [show, prodottoId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked ? "true" : "false",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const venditaData = {
        prodottoId: parseInt(formData.prodottoId, 10),
        customerId: formData.customerId,
        ricettaMedica: formData.ricettaMedica,
        numeroRicettaMedica:
          formData.ricettaMedica === "true" ? formData.numeroRicettaMedica : "",
      };

      console.log("Sending vendita data:", venditaData);

      await createVendita(venditaData);
      onVenditaCreated();
    } catch (err) {
      console.error("Errore completo:", err);
      setError("Errore durante la registrazione della vendita: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Registra Nuova Vendita</Modal.Title>
      </Modal.Header>

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>ID Prodotto</Form.Label>
            <Form.Control
              type="number"
              name="prodottoId"
              value={formData.prodottoId}
              onChange={handleChange}
              required
              disabled={prodottoId !== null}
            />
            <Form.Control.Feedback type="invalid">
              Inserisci l'ID del prodotto.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Codice Fiscale Cliente</Form.Label>
            <Form.Control
              type="text"
              name="customerId"
              value={formData.customerId}
              onChange={handleChange}
              required
              placeholder="Inserisci il codice fiscale del cliente"
            />
            <Form.Control.Feedback type="invalid">
              Inserisci il codice fiscale del cliente.
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              Esempio: RNGDLR65A12H789L
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Ricetta Medica"
              name="ricettaMedica"
              checked={formData.ricettaMedica === "true"}
              onChange={handleChange}
              id="ricettaMedicaCheck"
            />
          </Form.Group>

          {formData.ricettaMedica === "true" && (
            <Form.Group className="mb-3">
              <Form.Label>Numero Ricetta Medica</Form.Label>
              <Form.Control
                type="text"
                name="numeroRicettaMedica"
                value={formData.numeroRicettaMedica}
                onChange={handleChange}
                required={formData.ricettaMedica === "true"}
                placeholder="Inserisci il numero della ricetta"
              />
              <Form.Control.Feedback type="invalid">
                Inserisci il numero della ricetta medica.
              </Form.Control.Feedback>
            </Form.Group>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annulla
          </Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Registrazione...
              </>
            ) : (
              "Registra Vendita"
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateVenditaModal;

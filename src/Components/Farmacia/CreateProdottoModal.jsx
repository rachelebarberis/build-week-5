import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import {
  addFarmaco,
  getAllFornitori,
} from "../../Redux/Actions/farmaciaActions";

const CreateProdottoModal = ({ show, handleClose, onProdottoCreated }) => {
  const [formData, setFormData] = useState({
    nome: "",
    fornitoreId: "",
    usiProdotto: "",
    cassettoId: "",
    armadiettoId: "",
  });

  const [fornitori, setFornitori] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingFornitori, setFetchingFornitori] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show) {
      fetchFornitori();
    }
  }, [show]);

  const fetchFornitori = async () => {
    try {
      setFetchingFornitori(true);
      const response = await getAllFornitori();

      if (Array.isArray(response)) {
        setFornitori(response);
      } else if (response && response.fornitori) {
        setFornitori(response.fornitori);
      } else {
        console.warn("Formato risposta fornitori non valido:", response);
        setFornitori([]);
      }
    } catch (error) {
      console.error("Errore nel caricamento dei fornitori:", error);
      setError("Errore nel caricamento dei fornitori: " + error.message);
      setFornitori([]);
    } finally {
      setFetchingFornitori(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value ? parseInt(value, 10) : "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prodottoData = {
        nome: formData.nome,
        fornitoreId: formData.fornitoreId
          ? parseInt(formData.fornitoreId, 10)
          : null,
        usiProdotto: formData.usiProdotto,
        cassettoId: formData.cassettoId
          ? parseInt(formData.cassettoId, 10)
          : null,
        armadiettoId: formData.armadiettoId
          ? parseInt(formData.armadiettoId, 10)
          : null,
      };

      await addFarmaco(prodottoData);
      onProdottoCreated();
      setFormData({
        nome: "",
        fornitoreId: "",
        usiProdotto: "",
        cassettoId: "",
        armadiettoId: "",
      });
      setError(null);
      handleClose();
    } catch (err) {
      console.error("Errore completo:", err);
      setError(`Errore nella creazione del prodotto: ${err.message}`);
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
          <Modal.Title id="verde"> Nuovo Prodotto</Modal.Title>
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
              <i id="verde" className="bi bi-tag me-2"></i>
              Nome Prodotto
            </Form.Label>
            <Form.Control
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="shadow-sm"
              placeholder="Inserisci il nome del prodotto"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label id="verde" className="fw-semibold">
              <i id="verde" className="bi bi-building me-2"></i>
              Fornitore
            </Form.Label>
            {fetchingFornitori ? (
              <div className="text-center py-3">
                <Spinner animation="border" size="sm" className="me-2" />
                Caricamento fornitori...
              </div>
            ) : (
              <Form.Select
                name="fornitoreId"
                value={formData.fornitoreId}
                onChange={handleChange}
                className="form-select-sm shadow-sm"
              >
                <option value="">Seleziona un fornitore</option>
                {fornitori.map((fornitore) => (
                  <option key={fornitore.id} value={fornitore.id}>
                    {fornitore.nome}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label id="verde" className="fw-semibold">
                  <i id="verde" className="bi bi-archive me-2"></i>
                  ID Armadietto
                </Form.Label>
                <Form.Control
                  type="number"
                  name="armadiettoId"
                  value={formData.armadiettoId}
                  onChange={handleChange}
                  min="1"
                  className="shadow-sm"
                  placeholder="Opzionale"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label id="verde" className="fw-semibold">
                  <i id="verde" className="bi bi-inbox me-2"></i>
                  ID Cassetto
                </Form.Label>
                <Form.Control
                  type="number"
                  name="cassettoId"
                  value={formData.cassettoId}
                  onChange={handleChange}
                  min="1"
                  className="shadow-sm"
                  placeholder="Opzionale"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label id="verde" className="fw-semibold">
              <i id="verde" className="bi bi-card-text me-2"></i>
              Usi Prodotto
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="usiProdotto"
              value={formData.usiProdotto}
              onChange={handleChange}
              placeholder="Inserisci una descrizione dettagliata degli usi del prodotto..."
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
              variant="success"
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

export default CreateProdottoModal;

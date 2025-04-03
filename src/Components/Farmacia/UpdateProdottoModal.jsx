import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import {
  getProdottoById,
  updateProdotto,
  getAllFornitori,
} from "../../Redux/Actions/farmaciaActions";

const UpdateProdottoModal = ({
  show,
  handleClose,
  prodottoId,
  onProdottoUpdated,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    fornitoreId: "",
    usiProdotto: "",
    cassettoId: "",
    armadiettoId: "",
  });

  const [prodottoInfo, setProdottoInfo] = useState(null);
  const [fornitori, setFornitori] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [fetchingFornitori, setFetchingFornitori] = useState(false);

  useEffect(() => {
    if (show && prodottoId) {
      fetchProdottoDetails();
      fetchFornitori();
    }
  }, [show, prodottoId]);

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
    } finally {
      setFetchingFornitori(false);
    }
  };

  const fetchProdottoDetails = async () => {
    try {
      setFetchLoading(true);
      const response = await getProdottoById(prodottoId);

      if (response && response.product) {
        const prodotto = response.product;

        setFormData({
          nome: prodotto.nome || "",
          fornitoreId: prodotto.fornitore?.id || "",
          usiProdotto: prodotto.usiProdotto || "",
          cassettoId: prodotto.cassetto?.cassettoId || "",
          armadiettoId: prodotto.cassetto?.armadiettoId || "",
        });

        setProdottoInfo({
          nome: prodotto.nome || "Prodotto",
          fornitore: prodotto.fornitore?.nome || "Non specificato",
        });
      } else {
        setError("Dati del prodotto non trovati nella risposta");
      }
    } catch (err) {
      setError(
        "Errore nel caricamento dei dettagli del prodotto: " + err.message
      );
      console.error("Error fetching prodotto details:", err);
    } finally {
      setFetchLoading(false);
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
    setError(null);

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

      await updateProdotto(prodottoId, prodottoData);
      handleClose();
      onProdottoUpdated();
    } catch (err) {
      setError("Errore durante l'aggiornamento del prodotto: " + err.message);
      console.error("Error updating prodotto:", err);
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
        <div className="w-100 text-end">
          <Modal.Title>Modifica Prodotto</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        {error && (
          <Alert variant="danger" className="mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        {fetchLoading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            {prodottoInfo && (
              <div className="mb-4 p-3 bg-light rounded border">
                <h6 className="mb-1">Prodotto:</h6>
                <div className="fs-5 fw-bold">{prodottoInfo.nome}</div>
                {prodottoInfo.fornitore && (
                  <div className="small text-muted">
                    Fornitore: {prodottoInfo.fornitore}
                  </div>
                )}
              </div>
            )}

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                <i className="bi bi-tag me-2"></i>
                Nome Prodotto
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
              <Form.Label className="fw-semibold">
                <i className="bi bi-building me-2"></i>
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
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-archive me-2"></i>
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
                  <Form.Label className="fw-semibold">
                    <i className="bi bi-inbox me-2"></i>
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
              <Form.Label className="fw-semibold">
                <i className="bi bi-card-text me-2"></i>
                Usi Prodotto
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="usiProdotto"
                value={formData.usiProdotto}
                onChange={handleChange}
                className="shadow-sm"
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
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
                    Aggiornamento...
                  </>
                ) : (
                  <>
                    <i className="bi bi-check-circle me-1"></i>
                    Aggiorna
                  </>
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateProdottoModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner, Row, Col } from "react-bootstrap";
import {
  getRicoveroById,
  updateRicovero,
} from "../../Redux/Actions/ricoveriActions";

const UpdateRicoveroModal = ({
  show,
  handleClose,
  ricoveroId,
  onRicoveroUpdated,
}) => {
  const [formData, setFormData] = useState({
    puppyId: "",
    dataInizioRicovero: "",
    descrizione: "",
    dataFineRicovero: "",
  });

  const [puppyInfo, setPuppyInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    if (show && ricoveroId) {
      fetchRicoveroData();
    }
  }, [show, ricoveroId]);

  const fetchRicoveroData = async () => {
    setFetchLoading(true);
    try {
      const ricovero = await getRicoveroById(ricoveroId);
      const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
      };

      setFormData({
        puppyId: ricovero.puppyId,
        dataInizioRicovero: formatDate(ricovero.dataInizioRicovero),
        descrizione: ricovero.descrizione,
        dataFineRicovero: formatDate(ricovero.dataFineRicovero),
      });

      setPuppyInfo({
        nome: ricovero.puppyNome || "Puppy",
        tipologia: ricovero.puppyTipologia || "Non specificato",
      });
    } catch (err) {
      setError("Errore nel caricamento dei dati: " + err.message);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClearEndDate = () => {
    setFormData({ ...formData, dataFineRicovero: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const dataToSubmit = { ...formData };

      if (dataToSubmit.dataFineRicovero === "") {
        dataToSubmit.dataFineRicovero = null;
      }

      await updateRicovero(ricoveroId, dataToSubmit);
      handleClose();
      onRicoveroUpdated();
    } catch (err) {
      setError("Errore durante l'aggiornamento del ricovero: " + err.message);
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
        <div className="w-100">
          <Modal.Title id="verde">Modifica Ricovero</Modal.Title>
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
            {puppyInfo && (
              <div className="mb-4 p-3 bg-light rounded border">
                <div id="verde" className="fs-5 fw-bold text-center">
                  {puppyInfo.nome}
                </div>
              </div>
            )}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label id="verde" className="fw-semibold">
                    <i id="verde" className="bi bi-calendar-plus me-2"></i>
                    Data Inizio Ricovero
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dataInizioRicovero"
                    value={formData.dataInizioRicovero}
                    onChange={handleChange}
                    required
                    className="shadow-sm"
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-4">
                  <Form.Label id="verde" className="fw-semibold">
                    <i id="verde" className="bi bi-calendar-check me-2"></i>
                    Data Fine (opzionale)
                  </Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="date"
                      name="dataFineRicovero"
                      value={formData.dataFineRicovero}
                      onChange={handleChange}
                      className="shadow-sm"
                    />
                    <Button
                      variant="outline-secondary"
                      className="ms-2"
                      onClick={handleClearEndDate}
                      title="Rimuovi data fine (ancora in ricovero)"
                    >
                      <i className="bi bi-x-lg"></i>
                    </Button>
                  </div>
                  <Form.Text className="text-muted">
                    Lascia vuoto se il puppy è ancora in ricovero
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-4">
              <Form.Label id="verde" className="fw-semibold">
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
                variant="success"
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

export default UpdateRicoveroModal;

import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert, Spinner } from "react-bootstrap";
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
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Modifica Ricovero</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {fetchLoading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Data Fine Ricovero</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="date"
                  name="dataFineRicovero"
                  value={formData.dataFineRicovero}
                  onChange={handleChange}
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

            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Annulla
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                {loading ? "Aggiornamento in corso..." : "Aggiorna Ricovero"}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default UpdateRicoveroModal;

import React, { useState } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import { deleteRicovero } from "../../Redux/Actions/ricoveriActions";

const DeleteRicoveroModal = ({
  show,
  handleClose,
  ricoveroId,
  ricoveroInfo,
  onRicoveroDeleted,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteRicovero(ricoveroId);
      handleClose();
      onRicoveroDeleted(ricoveroId);
    } catch (err) {
      setError("Errore durante l'eliminazione del ricovero: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Non specificata";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT");
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header
        closeButton
        className="bg-light"
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <div className="w-100 text-end">
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        {error && (
          <Alert variant="danger" className="mb-4">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            {error}
          </Alert>
        )}

        <div className="text-center mb-4">
          <div className="display-1 text-danger mb-3">
            <i className="bi bi-trash"></i>
          </div>
          <h5>Sei sicuro di voler eliminare questo ricovero?</h5>
        </div>

        <div className="mb-4 p-3 bg-light rounded border">
          <div className="mb-2">
            <strong>Puppy:</strong>{" "}
            {ricoveroInfo?.puppyNome || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong>Data inizio:</strong>{" "}
            {formatDate(ricoveroInfo?.dataInizioRicovero)}
          </div>
          {ricoveroInfo?.dataFineRicovero && (
            <div className="mb-2">
              <strong>Data fine:</strong>{" "}
              {formatDate(ricoveroInfo?.dataFineRicovero)}
            </div>
          )}
        </div>

        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Questa azione non può essere annullata. Tutti i dati relativi a questo
          ricovero verranno eliminati permanentemente.
        </Alert>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          disabled={loading}
          className="px-3"
        >
          <i className="bi bi-x-circle me-1"></i>
          Annulla
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
          className="px-4"
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Eliminazione...
            </>
          ) : (
            <>
              <i className="bi bi-trash me-1"></i>
              Elimina
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRicoveroModal;

import React, { useState } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";

const DeleteClienteModal = ({ show, handleClose, handleDelete, cliente }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await handleDelete();
    } catch (err) {
      setError("Errore durante l'eliminazione del cliente: " + err.message);
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
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <Modal.Header
        closeButton
        className="bg-light"
        style={{ borderBottom: "2px solid #dee2e6" }}
      >
        <div className="w-100 text-center">
          <Modal.Title id="verde">Conferma Eliminazione</Modal.Title>
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
          <div className="display-1 mb-3">
            <i id="verde" className="bi bi-trash"></i>
          </div>
          <h5 id="verde">Sei sicuro di voler eliminare questo cliente?</h5>
        </div>

        <div className="mb-4 p-3 bg-light rounded border">
          <div className="mb-2">
            <strong id="verde">Nome:</strong>{" "}
            {cliente.nome || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong id="verde">Cognome:</strong>{" "}
            {cliente.cognome || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong id="verde">Codice Fiscale:</strong>{" "}
            {cliente.codiceFiscale || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong id="verde">Data di Nascita:</strong>{" "}
            {formatDate(cliente.dataDiNascita)}
          </div>
          <div className="mb-2">
            <strong id="verde">Indirizzo:</strong>{" "}
            {cliente.indirizzo || "Non specificato"}
          </div>
        </div>

        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Tutti i dati relativi a questo cliente verranno eliminati
          permanentemente.
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
          onClick={handleConfirmDelete}
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

export default DeleteClienteModal;

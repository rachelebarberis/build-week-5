import React, { useState } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import { deleteProdotto } from "../../Redux/Actions/farmaciaActions";

const DeleteProdottoModal = ({
  show,
  handleClose,
  prodottoId,
  prodottoInfo,
  onProdottoDeleted,
}) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      await deleteProdotto(prodottoId);
      handleClose();
      onProdottoDeleted(prodottoId);
    } catch (err) {
      setError("Errore durante l'eliminazione del prodotto: " + err.message);
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
          <div className="display-1  mb-3">
            <i id="verde" className="bi bi-trash"></i>
          </div>
          <h5 id="verde">Sei sicuro di voler eliminare questo prodotto?</h5>
        </div>

        <div className="mb-4 p-3 bg-light rounded border">
          <div className="mb-2">
            <strong id="verde">Nome:</strong>{" "}
            {prodottoInfo?.nome || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong id="verde">Usi Prodotto:</strong>{" "}
            {prodottoInfo?.usiProdotto || "Non specificato"}
          </div>
          {prodottoInfo?.fornitore && (
            <div className="mb-2">
              <strong id="verde">Fornitore:</strong>{" "}
              {prodottoInfo.fornitore.nome || "Non specificato"}
            </div>
          )}
        </div>

        <Alert variant="warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Tutti i dati relativi a questo prodotto verranno eliminati
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

export default DeleteProdottoModal;

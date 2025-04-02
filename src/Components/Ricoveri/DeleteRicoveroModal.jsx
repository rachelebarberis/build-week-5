import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
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

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Conferma Eliminazione</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <p>
          Sei sicuro di voler eliminare il ricovero per{" "}
          {ricoveroInfo?.puppyNome || "questo puppy"}?
        </p>
        <p>Questa azione non può essere annullata.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Eliminazione in corso..." : "Elimina"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteRicoveroModal;

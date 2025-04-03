import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deletePuppy } from "../Redux/Actions/puppiesActions";

const DeletePuppyModal = ({
  show,
  handleClose,
  puppyId,
  puppyInfo,
  onPuppyDeleted,
}) => {
  const handleDelete = async () => {
    try {
      await deletePuppy(puppyId); // Funzione per eliminare il puppy
      handleClose();
      onPuppyDeleted(puppyId); // Callback per aggiornare la lista dei puppies
    } catch (err) {
      console.error("Errore durante l'eliminazione del puppy:", err.message);
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
          <Modal.Title>Conferma Eliminazione</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        <div className="text-center mb-4">
          <div className="display-1 text-danger mb-3">
            <i className="bi bi-trash"></i>
          </div>
          <h5>Sei sicuro di voler eliminare questo puppy?</h5>
        </div>

        <div className="mb-4 p-3 bg-light rounded border">
          <div className="mb-2">
            <strong>Nome:</strong> {puppyInfo?.nome || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong>Tipologia:</strong>{" "}
            {puppyInfo?.tipologia || "Non specificata"}
          </div>
          <div className="mb-2">
            <strong>Colore Mantello:</strong>{" "}
            {puppyInfo?.coloreMantello || "Non specificato"}
          </div>
        </div>

        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Questa azione non può essere annullata. Tutti i dati relativi a questo
          puppy verranno eliminati permanentemente.
        </div>
      </Modal.Body>

      <Modal.Footer className="border-top">
        <Button
          variant="outline-secondary"
          onClick={handleClose}
          className="px-3"
        >
          <i className="bi bi-x-circle me-1"></i>
          Annulla
        </Button>
        <Button variant="danger" onClick={handleDelete} className="px-4">
          <i className="bi bi-trash me-1"></i>
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePuppyModal;

import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deletePuppy } from "../../Redux/Actions/puppiesActions";
import { useDispatch } from "react-redux";

const DeletePuppyModal = ({ show, handleClose, puppy, onPuppyDeleted }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deletePuppy(puppy.puppyId)); // Funzione per eliminare il puppy
      handleClose();
      onPuppyDeleted(puppy.puppyId); // Callback per aggiornare la lista dei puppies
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
          <Modal.Title id="verde">Conferma Eliminazione</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        <div className="text-center mb-4">
          <div className="display-1  mb-3">
            <i id="verde" className="bi bi-trash"></i>
          </div>
          <h5 id="verde">Sei sicuro di voler eliminare questo puppy?</h5>
        </div>

        <div className="mb-4 p-3 bg-light rounded border">
          <div className="mb-2">
            <strong id="verde">Nome:</strong> {puppy?.nome || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong id="verde">Razza:</strong>{" "}
            {puppy?.tipologia || "Non specificata"}
          </div>
          <div className="mb-2">
            <strong id="verde">Colore Mantello:</strong>
            {puppy?.coloreMantello || "Non specificato"}
          </div>
        </div>

        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Tutti i dati relativi a questo puppy verranno eliminati
          permanentemente.
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

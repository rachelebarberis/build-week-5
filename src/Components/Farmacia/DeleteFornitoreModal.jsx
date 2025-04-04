import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteFornitoreModal = ({
  show,
  handleClose,
  handleDelete,
  fornitore,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title id="verde">Conferma Eliminazione</Modal.Title>
      </Modal.Header>
      <Modal.Body id="verde">
        Sei sicuro di voler eliminare il fornitore{" "}
        <strong>{fornitore.nome}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Annulla
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteFornitoreModal;

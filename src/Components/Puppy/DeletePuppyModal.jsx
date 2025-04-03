<<<<<<< HEAD:src/Components/Puppy/DeletePuppyModal.jsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { deletePuppy } from '../../Redux/Actions/puppiesActions';
import { useDispatch } from 'react-redux';
=======
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deletePuppy } from "../Redux/Actions/puppiesActions";
import { useDispatch } from "react-redux";
>>>>>>> origin/rachele:src/Components/DeletePuppyModal.jsx

const DeletePuppyModal = ({ show, handleClose, puppy, onPuppyDeleted }) => {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {
      await dispatch(deletePuppy(puppy.puppyId));
      handleClose();
      onPuppyDeleted(puppy.puppyId);
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
        <div className="w-100">
          <Modal.Title style={{ color: "#2A4D38" }}>
            Conferma Eliminazione
          </Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        <div className="text-center mb-4">
          <div className="display-1  mb-3">
            <i className="bi bi-trash" style={{ color: "#2A4D38" }}></i>
          </div>
          <h5 style={{ color: "#2A4D38" }}>
            Sei sicuro di voler eliminare questo puppy?
          </h5>
        </div>

        <div className="mb-4 p-3 bg-light rounded border">
          <div className="mb-2">
            <strong style={{ color: "#2A4D38" }}>Nome: </strong>
            {puppy?.nome || "Non specificato"}
          </div>
          <div className="mb-2">
            <strong style={{ color: "#2A4D38" }}>Tipologia: </strong>{" "}
            {puppy?.tipologia || "Non specificata"}
          </div>
          <div className="mb-2">
            <strong style={{ color: "#2A4D38" }}>Colore Mantello: </strong>
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
        <Button
          variant="outline-muted"
          style={{ color: "##2A4D38", backgroundColor: "#D8E2DC" }}
          onClick={handleDelete}
          className="px-4"
        >
          <i className="bi bi-trash me-1"></i>
          Elimina
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePuppyModal;

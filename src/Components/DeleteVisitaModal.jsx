import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { deleteVisita, getAllVisite } from "../Redux/Actions/VisitaAction";

const DeleteVisitaComponent = ({ show, handleClose, onVisitaDeleted }) => {
  const { id } = useParams();

  const [visita, setVisita] = useState(null);

  useEffect(() => {
    const fetchVisita = async () => {
      const visite = await getAllVisite();
      const selectedVisita = visite.find((v) => v.id === parseInt(id));
      setVisita(selectedVisita);
    };
    if (show) {
      fetchVisita();
    }
  }, [id, show]);

  const handleDelete = async () => {
    const conferma = window.confirm(
      "Sei sicuro di voler eliminare questa visita?"
    );
    if (conferma) {
      await deleteVisita(id);
      handleClose();
      onVisitaDeleted(id);
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
        <div className="w-100">
          <Modal.Title style={{ color: "#2A4D38" }}>
            Conferma Eliminazione
          </Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        {visita ? (
          <div className="text-center mb-4">
            <div className="display-1 text-danger mb-3">
              <i className="bi bi-trash"></i>
            </div>
            <h5 style={{ color: "#2A4D38" }}>
              Sei sicuro di voler eliminare la visita?
            </h5>
          </div>
        ) : (
          <p>Caricamento...</p>
        )}

        {visita && (
          <div className="mb-4 p-3 bg-light rounded border">
            <div className="mb-2">
              <strong style={{ color: "#2A4D38" }}>Puppy:</strong>{" "}
              {visita.puppyNome || "Non specificato"}
            </div>
            <div className="mb-2">
              <strong style={{ color: "#2A4D38" }}>Data Visita:</strong>{" "}
              {formatDate(visita.dataVisita)}
            </div>
          </div>
        )}

        <div className="alert alert-warning">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          Tutti i dati relativi a questa visita verranno eliminati
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

export default DeleteVisitaComponent;

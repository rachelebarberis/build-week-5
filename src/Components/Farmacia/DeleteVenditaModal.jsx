import React, { useState } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import { deleteVendita } from "../../Redux/Actions/farmaciaActions";

const DeleteVenditaModal = ({
  show,
  handleClose,
  venditaId,
  venditaInfo,
  onVenditaDeleted,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    try {
      setLoading(true);
      setError(null);
      await deleteVendita(venditaId);
      onVenditaDeleted();
    } catch (err) {
      setError("Errore durante l'eliminazione della vendita: " + err.message);
      console.error("Errore completo:", err);
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

        <p>Sei sicuro di voler eliminare questa vendita?</p>

        <div className="mb-3">
          <strong>ID Vendita:</strong> {venditaId}
        </div>

        {venditaInfo && (
          <>
            <div className="mb-2">
              <strong>Prodotto:</strong>{" "}
              {venditaInfo.nomeProdotto || venditaInfo.prodottoId || "N/A"}
            </div>
            <div className="mb-2">
              <strong>Cliente:</strong>{" "}
              {venditaInfo.customerId || venditaInfo.codiceFiscale || "N/A"}
            </div>
            <div className="mb-2">
              <strong>Data Vendita:</strong>{" "}
              {venditaInfo.dataVendita
                ? new Date(venditaInfo.dataVendita).toLocaleDateString("it-IT")
                : "N/A"}
            </div>
            {venditaInfo.numeroRicetta && (
              <div className="mb-2">
                <strong>Numero Ricetta:</strong> {venditaInfo.numeroRicetta}
              </div>
            )}
          </>
        )}

        <Alert variant="warning" className="mt-3">
          Questa operazione non può essere annullata.
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Annulla
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Eliminazione...
            </>
          ) : (
            "Elimina Vendita"
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteVenditaModal;

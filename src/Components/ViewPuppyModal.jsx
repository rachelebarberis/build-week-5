import React, { useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPuppyById } from "../Redux/Actions/puppiesActions";

const ViewPuppyModal = ({ show, handleClose, puppy }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (show && id) {
      dispatch(fetchPuppyById(id));
    }
  }, [show, id, dispatch]);

  if (!puppy) {
    return <div>Loading...</div>;
  }

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ color: "#2A4D38" }}>
          Dettagli Cucciolo
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Card className="border-0">
          <Card.Body className="text-center">
            <h4 className="text-center mb-3" style={{ color: "#2A4D38" }}>
              {puppy.nome || "Nome non specificato"}
            </h4>
            <hr></hr>
            <div>
              <p>
                <span style={{ color: "#2A4D38" }}>Tipologia: </span>
                <span style={{ color: "#2F855A" }}>
                  {puppy.tipologia || "Non specificata"}
                </span>
              </p>
              <p>
                <span style={{ color: "#2A4D38" }}>Colore Mantello: </span>
                <span style={{ color: "#2F855A" }}>
                  {puppy.coloreMantello || "Non specificato"}
                </span>
              </p>
              <p>
                <span style={{ color: "#2A4D38" }}>Data di Nascita: </span>
                <span style={{ color: "#2F855A" }}>
                  {puppy.dataNascita || "Non specificata"}
                </span>
              </p>
              {puppy.microchipPresente && (
                <p>
                  <span style={{ color: "#2A4D38" }}>Numero Microchip: </span>
                  <span style={{ color: "#2F855A" }}>
                    {puppy.numeroMicrochip || "Non disponibile"}
                  </span>
                </p>
              )}
              {puppy.owner && (
                <p>
                  <span style={{ color: "#2A4D38" }}>Proprietario: </span>
                  <span style={{ color: "#2F855A" }}>
                    {puppy.owner.firstName} {puppy.owner.lastName}
                  </span>
                </p>
              )}
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewPuppyModal;

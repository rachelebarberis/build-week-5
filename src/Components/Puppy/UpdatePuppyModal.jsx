import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePuppy } from "../../Redux/Actions/puppiesActions";
import { Modal, Button, Form } from "react-bootstrap";

const UpdatePuppyModal = ({ show, handleClose, puppy, onPuppyUpdated }) => {
  const { puppies } = useSelector((state) => state.puppies);
  const dispatch = useDispatch();

  const [nome, setNome] = useState("");
  const [tipologia, setTipologia] = useState("");
  const [coloreMantello, setColoreMantello] = useState("");
  const [dataNascita, setDataNascita] = useState("");
  const [microchipPresente, setMicrochipPresente] = useState(false);
  const [numeroMicrochip, setNumeroMicrochip] = useState("");
  const [clienteId, setClienteId] = useState("");

  useEffect(() => {
    if (show && puppy) {
      const foundPuppy = puppies.find(
        (p) => p.puppyId === parseInt(puppy.puppyId)
      );

      if (foundPuppy) {
        setNome(foundPuppy.nome);
        setTipologia(foundPuppy.tipologia);
        setColoreMantello(foundPuppy.coloreMantello);
        setDataNascita(foundPuppy.dataNascita);
        setMicrochipPresente(foundPuppy.microchipPresente);
        setNumeroMicrochip(foundPuppy.numeroMicrochip || "");
        setClienteId(foundPuppy.clienteId || "");
      }
    }
  }, [show, puppy?.puppyId, puppies]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPuppy = {
      nome: nome,
      tipologia: tipologia,
      coloreMantello: coloreMantello,
      dataNascita: dataNascita,
      microchipPresente: microchipPresente,
    };

    if (numeroMicrochip) {
      updatedPuppy.numeroMicrochip = numeroMicrochip;
    }

    if (clienteId) {
      updatedPuppy.clienteId = clienteId;
    }

    const isModified = Object.keys(updatedPuppy).some(
      (key) => updatedPuppy[key] !== puppy[key]
    );

    if (!isModified) {
      console.log("Nessuna modifica, richiesta non inviata");
      handleClose();
      return;
    }

    const success = await dispatch(updatePuppy(puppy.puppyId, updatedPuppy));

    if (success) {
      onPuppyUpdated();
      handleClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title id="verde">Modifica Puppy</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label id="verde">Nome</Form.Label>
            <Form.Control
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label id="verde">Razza</Form.Label>
            <Form.Control
              type="text"
              value={tipologia}
              onChange={(e) => setTipologia(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label id="verde">Colore Mantello</Form.Label>
            <Form.Control
              type="text"
              value={coloreMantello}
              onChange={(e) => setColoreMantello(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label id="verde">Data di Nascita</Form.Label>
            <Form.Control
              type="date"
              value={dataNascita}
              onChange={(e) => setDataNascita(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label id="verde">Microchip Presente</Form.Label>
            <Form.Check
              type="checkbox"
              checked={microchipPresente}
              onChange={(e) => setMicrochipPresente(e.target.checked)}
            />
          </Form.Group>

          {microchipPresente && (
            <Form.Group className="mb-3">
              <Form.Label id="verde">Numero Microchip</Form.Label>
              <Form.Control
                type="text"
                value={numeroMicrochip}
                onChange={(e) => setNumeroMicrochip(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label id="verde">ID Cliente (opzionale)</Form.Label>
            <Form.Control
              type="text"
              value={clienteId}
              onChange={(e) => setClienteId(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Annulla
            </Button>
            <Button variant="success" type="submit">
              Aggiorna Puppy
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdatePuppyModal;

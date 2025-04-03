import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { createVisita } from "../Redux/Actions/VisitaAction";
import { fetchPuppies } from "../Redux/Actions/puppiesActions";

const CreateVisitaModal = ({ show, handleClose, onVisitaCreated }) => {
  const dispatch = useDispatch();
  const { puppies } = useSelector((state) => state.puppies);

  const [formData, setFormData] = useState({
    puppyId: "",
    dataVisita: new Date().toISOString().split("T")[0],
    obiettivoEsame: "",
    descrizioneCura: "",
  });

  useEffect(() => {
    if (show) {
      dispatch(fetchPuppies());
    }
  }, [show, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVisita(formData);
      onVisitaCreated();
      setFormData({
        puppyId: "",
        dataVisita: new Date().toISOString().split("T")[0],
        obiettivoEsame: "",
        descrizioneCura: "",
      });
      handleClose();
    } catch (err) {
      console.error("Errore nella creazione della visita:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-center w-100" style={{ color: "#2A4D38" }}>
          Nuova Visita
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#2A4D38" }}>Puppy</Form.Label>
            <Form.Select
              style={{ color: "#2F855A" }}
              name="puppyId"
              value={formData.puppyId}
              onChange={handleChange}
              required
            >
              <option value="">Seleziona un puppy</option>
              {puppies.map((puppy) => (
                <option key={puppy.puppyId} value={puppy.puppyId}>
                  {puppy.nome} ({puppy.tipologia})
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label style={{ color: "#2A4D38" }}>
                  Data Visita
                </Form.Label>
                <Form.Control
                  style={{ color: "#2F855A" }}
                  type="date"
                  name="dataVisita"
                  value={formData.dataVisita}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#2A4D38" }}>
              Obiettivo Esame
            </Form.Label>
            <Form.Control
              style={{ color: "#2F855A" }}
              type="text"
              name="obiettivoEsame"
              value={formData.obiettivoEsame}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: "#2A4D38" }}>
              Descrizione Cura
            </Form.Label>
            <Form.Control
              style={{ color: "#2F855A" }}
              as="textarea"
              name="descrizioneCura"
              value={formData.descrizioneCura}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              variant="outline-secondary"
              onClick={handleClose}
              className="me-2"
            >
              Annulla
            </Button>
            <Button
              variant="outline-muted"
              style={{ color: "#D8E2DC", backgroundColor: "#2F855A" }}
              type="submit"
            >
              Salva
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateVisitaModal;

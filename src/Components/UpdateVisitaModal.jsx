import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { updateVisita, getAllVisite } from "../Redux/Actions/VisitaAction";

const VisiteEditComponent = ({ show, handleClose, onVisitaUpdated }) => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    dataVisita: "",
    obiettivoEsame: "",
    descrizioneCura: "",
  });

  useEffect(() => {
    if (show) {
      fetchVisita();
    }
  }, [show, id]);

  const fetchVisita = async () => {
    try {
      const visiteData = await getAllVisite();
      const visitaSelezionata = visiteData.find((v) => v.id === parseInt(id));
      if (visitaSelezionata) {
        setFormData({
          dataVisita: visitaSelezionata.dataVisita.split("T")[0] || "",
          obiettivoEsame: visitaSelezionata.obiettivoEsame || "",
          descrizioneCura: visitaSelezionata.descrizioneCura || "",
        });
      }
    } catch (err) {
      console.error("Errore nel recupero della visita:", err.message);
    }
  };

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
      await updateVisita(id, formData);
      handleClose();
      onVisitaUpdated();
    } catch (err) {
      console.error(
        "Errore durante l'aggiornamento della visita:",
        err.message
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title className="text-center w-100">Modifica Visita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Data Visita</Form.Label>
                <Form.Control
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
            <Form.Label>Obiettivo Esame</Form.Label>
            <Form.Control
              type="text"
              name="obiettivoEsame"
              value={formData.obiettivoEsame}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descrizione Cura</Form.Label>
            <Form.Control
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
            <Button variant="primary" type="submit">
              Salva
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default VisiteEditComponent;

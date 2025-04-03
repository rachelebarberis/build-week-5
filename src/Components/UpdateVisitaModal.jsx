import React, { useState, useEffect } from 'react';

import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { updateVisita, getAllVisite } from '../Redux/Actions/VisitaAction';

const VisiteEditComponent = ({
  show,
  handleClose,
  visitaId,
  onVisitaUpdated,
}) => {
  const [formData, setFormData] = useState({
    dataVisita: '',
    obiettivoEsame: '',
    descrizioneCura: '',
  });

  useEffect(() => {
    if (show) {
      fetchVisita();
    }
  }, [show, visitaId]);

  const fetchVisita = async () => {
    try {
      const visiteData = await getAllVisite();
      const visitaSelezionata = visiteData.find((v) => v.id === visitaId);
      console.log(visitaSelezionata);

      if (visitaSelezionata) {
        setFormData({
          dataVisita: visitaSelezionata.dataVisita.split('T')[0] || '',
          obiettivoEsame: visitaSelezionata.obiettivoEsame || '',
          descrizioneCura: visitaSelezionata.descrizioneCura || '',
        });
      }
    } catch (err) {
      console.error('Errore nel recupero della visita:', err.message);
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
      await updateVisita(visitaId, formData);
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
<<<<<<< HEAD
    <Modal show={show} onHide={handleClose} centered backdrop='static'>
      <Modal.Header closeButton className='bg-light'>
        <Modal.Title className='text-center w-100'>Modifica Visita</Modal.Title>
=======
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title style={{ color: "#2A4D38" }} className="text-center w-100">
          Modifica Visita
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
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
>>>>>>> origin/rachele
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
>>>>>>> origin/rachele
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
>>>>>>> origin/rachele
              value={formData.descrizioneCura}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className='d-flex justify-content-end'>
            <Button
              variant="outline-muted"
              style={{ backgroundColor: "#2F855A", color: "#D8E2DC" }}
              onClick={handleClose}
              className='me-2'
            >
              Annulla
            </Button>
            <Button
              variant="outline-muted"
              style={{ color: "##2A4D38", backgroundColor: "#D8E2DC" }}
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

export default VisiteEditComponent;

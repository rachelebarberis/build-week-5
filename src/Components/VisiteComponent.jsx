import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { getAllVisite } from '../Redux/Actions/VisitaAction';
import CreateVisitaModal from './CreateVisitaModal';
import UpdateVisitaModal from './UpdateVisitaModal';
import DeleteVisitaModal from './DeleteVisitaModal';
import ViewVisitaModal from './ViewVisitaModal';

const VisiteComponent = () => {
  const [visite, setVisite] = useState([]);
  const [selectedVisita, setSelectedVisita] = useState(null);

  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    view: false,
  });

  useEffect(() => {
    fetchVisite();
  }, []);

  const fetchVisite = async () => {
    const data = await getAllVisite();
    setVisite(data);
  };

  const toggleModal = (modalName, visita = null) => {
    const resetModals = {
      create: false,
      update: false,
      delete: false,
      view: false,
    };

    if (modalState[modalName] === true) {
      setSelectedVisita(null);
      setModalState(resetModals);
    } else {
      setSelectedVisita(visita);
      setModalState({
        ...resetModals,
        [modalName]: true,
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('it-IT');
  };

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className='text-center mb-4'>Sezione Visite</h4>

<<<<<<< HEAD
      <div className='d-flex justify-content-end mb-3'>
        <Button variant='outline-primary' onClick={() => toggleModal('create')}>
          <i className='bi bi-plus'></i> Nuova Visita
=======
      <div className="d-flex justify-content-end mb-3">
        <Button
          style={{ color: "#2A4D38" }}
          variant="outline-secondary"
          onClick={() => toggleModal("create")}
        >
          <i className="bi bi-plus" style={{ color: "#2A4D38" }}></i> Nuova
          Visita
>>>>>>> origin/rachele
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th style={{ color: "#2A4D38" }}>#</th>
            <th style={{ color: "#2A4D38" }}>Puppy</th>
            <th style={{ color: "#2A4D38" }}>Data Visita</th>
            <th style={{ color: "#2A4D38" }}>Obiettivo Esame</th>
            <th style={{ color: "#2A4D38" }}>Descrizione Cura</th>
            <th style={{ color: "#2A4D38" }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {visite.length === 0 ? (
            <tr>
              <td colSpan='6' className='text-center'>
                Nessuna visita trovata
              </td>
            </tr>
          ) : (
            visite.map((visita, index) => (
              <tr key={visita.id}>
<<<<<<< HEAD
                <td>{index + 1}</td>
                <td>{visita.animale?.nome || 'N/A'}</td>
                <td>{formatDate(visita.dataVisita)}</td>
                <td>{visita.obiettivoEsame}</td>
                <td>{visita.descrizioneCura}</td>
                <td className='text-center'>
                  <Button
                    variant='outline-secondary'
                    size='sm'
                    className='me-2'
                    onClick={() => toggleModal('update', visita)}
=======
                <td style={{ color: "#2A4D38" }}>{index + 1}</td>
                <td style={{ color: "#2A4D38" }}>
                  {visita.animale?.nome || "N/A"}
                </td>
                <td style={{ color: "#2A4D38" }}>
                  {formatDate(visita.dataVisita)}
                </td>
                <td style={{ color: "#2A4D38" }}>{visita.obiettivoEsame}</td>
                <td style={{ color: "#2A4D38" }}>{visita.descrizioneCura}</td>
                <td className="text-center">
                  <Button
                    variant="outline-muted"
                    style={{ color: "#2A4D38" }}
                    size="sm"
                    className="me-2"
                    onClick={() => toggleModal("update", visita)}
>>>>>>> origin/rachele
                  >
                    <i className='bi bi-pencil'></i>
                  </Button>
                  <Button
<<<<<<< HEAD
                    variant='outline-secondary'
                    size='sm'
                    className='me-2'
                    onClick={() => toggleModal('delete', visita)}
=======
                    variant="outline-muted"
                    style={{ color: "#2A4D38" }}
                    size="sm"
                    className="me-2"
                    onClick={() => toggleModal("delete", visita)}
>>>>>>> origin/rachele
                  >
                    <i className='bi bi-trash'></i>
                  </Button>
                  <Button
<<<<<<< HEAD
                    variant='outline-secondary'
                    size='sm'
                    onClick={() => toggleModal('view', visita)}
                  >
                    <i className='bi bi-info-circle'></i>
=======
                    variant="outline-muted"
                    style={{ color: "#2A4D38" }}
                    size="sm"
                    onClick={() => toggleModal("view", visita)}
                  >
                    <i className="bi bi-info-circle pe-sm-2 pe-md-0"></i>
>>>>>>> origin/rachele
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <CreateVisitaModal
        show={modalState.create}
        handleClose={() => toggleModal('create')}
        onVisitaCreated={fetchVisite}
      />

      {selectedVisita && (
        <>
          <UpdateVisitaModal
            show={modalState.update}
            handleClose={() => toggleModal('update')}
            visitaId={selectedVisita.id}
            onVisitaUpdated={fetchVisite}
          />

          <DeleteVisitaModal
            show={modalState.delete}
            handleClose={() => toggleModal('delete')}
            visitaId={selectedVisita.id}
            visitaInfo={selectedVisita}
            onVisitaDeleted={() => {
              setVisite((prev) =>
                prev.filter((v) => v.id !== selectedVisita.id)
              );
              toggleModal('delete');
            }}
          />
        </>
      )}
    </Container>
  );
};

export default VisiteComponent;

import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import { getAllVisite } from "../Redux/Actions/VisitaAction";
import CreateVisitaModal from "./CreateVisitaModal";
import UpdateVisitaModal from "./UpdateVisitaModal";
import DeleteVisitaModal from "./DeleteVisitaModal";

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
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("it-IT");
  };

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center mb-4">Sezione Visite</h4>

      <div className="d-flex justify-content-end mb-3">
        <Button
          id="addbtn"
          variant="outline-secondary"
          onClick={() => toggleModal("create")}
        >
          <i id="verde" className="bi bi-plus"></i> Nuova Visita
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Puppy</th>
            <th>Data Visita</th>
            <th>Obiettivo Esame</th>
            <th>Descrizione Cura</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {visite.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                Nessuna visita trovata
              </td>
            </tr>
          ) : (
            visite.map((visita, index) => (
              <tr key={visita.id}>
                <td>{index + 1}</td>
                <td>{visita.animale?.nome || "N/A"}</td>
                <td>{formatDate(visita.dataVisita)}</td>
                <td>{visita.obiettivoEsame}</td>
                <td>{visita.descrizioneCura}</td>
                <td className="text-center">
                  <Button
                    variant="outline-muted"
                    size="sm"
                    className="me-2"
                    onClick={() => toggleModal("update", visita)}
                  >
                    <i id="verde" className="bi bi-pencil"></i>
                  </Button>
                  <Button
                    variant="outline-muted"
                    size="sm"
                    className="me-2"
                    onClick={() => toggleModal("delete", visita)}
                  >
                    <i id="verde" className="bi bi-trash"></i>
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      <CreateVisitaModal
        show={modalState.create}
        handleClose={() => toggleModal("create")}
        onVisitaCreated={fetchVisite}
      />

      {selectedVisita && (
        <>
          <UpdateVisitaModal
            show={modalState.update}
            handleClose={() => toggleModal("update")}
            visitaId={selectedVisita.id}
            onVisitaUpdated={fetchVisite}
          />

          <DeleteVisitaModal
            show={modalState.delete}
            handleClose={() => toggleModal("delete")}
            visitaId={selectedVisita.id}
            visitaInfo={selectedVisita}
            onVisitaDeleted={() => {
              setVisite((prev) =>
                prev.filter((v) => v.id !== selectedVisita.id)
              );
              toggleModal("delete");
            }}
          />
        </>
      )}
    </Container>
  );
};

export default VisiteComponent;

import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  fetchClienti,
  addCliente,
  updateCliente,
  deleteCliente,
} from "../../Redux/Actions/clienteAction";

import AddClienteModal from "./AddClienteModal";
import EditClienteModal from "./EditClienteModal";
import DeleteClienteModal from "./DeleteClienteModal";

const ClientiListComponent = () => {
  const [clienti, setClienti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCliente, setCurrentCliente] = useState({
    id: 0,
    nome: "",
    cognome: "",
    codiceFiscale: "",
    dataDiNascita: "",
    indirizzo: "",
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    fetchClientiData();
  }, []);

  const fetchClientiData = async () => {
    try {
      setLoading(true);
      const data = await fetchClienti();
      setClienti(data.clienti || []);
      setError(null);
    } catch (err) {
      setError("Errore nel caricamento dei clienti: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      await addCliente(currentCliente);
      setShowAddModal(false);
      setCurrentCliente({
        id: 0,
        nome: "",
        cognome: "",
        codiceFiscale: "",
        dataDiNascita: "",
        indirizzo: "",
      });
      setValidated(false);
      await fetchClientiData();
    } catch (err) {
      setError("Errore durante l'aggiunta del cliente: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    try {
      setLoading(true);
      await updateCliente(currentCliente.id, currentCliente);
      setShowEditModal(false);
      setValidated(false);
      await fetchClientiData();
    } catch (err) {
      setError("Errore durante la modifica del cliente: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteCliente(currentCliente.id);
      setShowDeleteModal(false);
      await fetchClientiData();
    } catch (err) {
      setError("Errore durante l'eliminazione del cliente: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentCliente({
      ...currentCliente,
      [name]: value,
    });
  };

  const openEditModal = (cliente) => {
    const formattedDate = cliente.dataDiNascita
      ? cliente.dataDiNascita.split("T")[0]
      : "";
    setCurrentCliente({
      ...cliente,
      dataDiNascita: formattedDate,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (cliente) => {
    setCurrentCliente(cliente);
    setShowDeleteModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setValidated(false);
    setCurrentCliente({
      id: 0,
      nome: "",
      cognome: "",
      codiceFiscale: "",
      dataDiNascita: "",
      indirizzo: "",
    });
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setValidated(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <Container className="mt-4" style={{ fontFamily: "Poppins, sans-serif" }}>
      <h4 className="text-center">Gestione Clienti</h4>
      <Row className="mb-3">
        <Col className="text-end">
          <Button
            id="addbtn"
            variant="outline-secondary"
            onClick={() => setShowAddModal(true)}
          >
            Aggiungi Cliente
          </Button>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </Spinner>
        </div>
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="rounded-3 overflow-hidden"
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Cognome</th>
              <th>Codice Fiscale</th>
              <th>Data di Nascita</th>
              <th>Indirizzo</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {clienti && clienti.length > 0 ? (
              clienti.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.cognome}</td>
                  <td>{cliente.codiceFiscale}</td>
                  <td>{formatDate(cliente.dataDiNascita)}</td>
                  <td>{cliente.indirizzo}</td>
                  <td>
                    <Button
                      variant="outline-muted"
                      size="sm"
                      className="me-2"
                      onClick={() => openEditModal(cliente)}
                    >
                      <i id="verde" className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="outline-muted"
                      size="sm"
                      onClick={() => openDeleteModal(cliente)}
                    >
                      <i id="verde" className="bi bi-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td id="verde" colSpan="7" className="text-center">
                  Nessun cliente trovato
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <AddClienteModal
        show={showAddModal}
        handleClose={handleCloseAddModal}
        handleSubmit={handleAddSubmit}
        cliente={currentCliente}
        handleInputChange={handleInputChange}
        validated={validated}
      />

      <EditClienteModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleSubmit={handleEditSubmit}
        cliente={currentCliente}
        handleInputChange={handleInputChange}
        validated={validated}
      />

      <DeleteClienteModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDelete}
        cliente={currentCliente}
      />
    </Container>
  );
};

export default ClientiListComponent;

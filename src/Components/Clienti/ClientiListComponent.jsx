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

  return (
    <Container className="mt-4">
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
        <Table striped bordered hover responsive>
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
                      <i id="verde" className="bi bi-muted"></i>
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

      {/* Modal per aggiungere un cliente */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="verde">Aggiungi Cliente</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleAddSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label id="verde">Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={currentCliente.nome}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un nome valido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Cognome</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                value={currentCliente.cognome}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un cognome valido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Codice Fiscale</Form.Label>
              <Form.Control
                type="text"
                name="codiceFiscale"
                value={currentCliente.codiceFiscale}
                onChange={handleInputChange}
                required
                minLength={16}
                maxLength={16}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un codice fiscale valido (16 caratteri).
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                name="dataDiNascita"
                value={currentCliente.dataDiNascita}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci una data di nascita valida.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Indirizzo</Form.Label>
              <Form.Control
                type="text"
                name="indirizzo"
                value={currentCliente.indirizzo}
                onChange={handleInputChange}
                required
                maxLength={200}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un indirizzo valido.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Annulla
            </Button>
            <Button variant="success" type="submit">
              Salva
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Modal per modificare un cliente */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="verde">Modifica Cliente</Modal.Title>
        </Modal.Header>
        <Form noValidate validated={validated} onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label id="verde">Nome</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={currentCliente.nome}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un nome valido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Cognome</Form.Label>
              <Form.Control
                type="text"
                name="cognome"
                value={currentCliente.cognome}
                onChange={handleInputChange}
                required
                maxLength={100}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un cognome valido.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Codice Fiscale</Form.Label>
              <Form.Control
                type="text"
                name="codiceFiscale"
                value={currentCliente.codiceFiscale}
                onChange={handleInputChange}
                required
                minLength={16}
                maxLength={16}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un codice fiscale valido (16 caratteri).
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Data di Nascita</Form.Label>
              <Form.Control
                type="date"
                name="dataDiNascita"
                value={currentCliente.dataDiNascita}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Inserisci una data di nascita valida.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label id="verde">Indirizzo</Form.Label>
              <Form.Control
                type="text"
                name="indirizzo"
                value={currentCliente.indirizzo}
                onChange={handleInputChange}
                required
                maxLength={200}
              />
              <Form.Control.Feedback type="invalid">
                Inserisci un indirizzo valido.
              </Form.Control.Feedback>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Annulla
            </Button>
            <Button variant="success" type="submit">
              Salva Modifiche
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="verde">Conferma Eliminazione</Modal.Title>
        </Modal.Header>
        <Modal.Body id="verde">
          Sei sicuro di voler eliminare il cliente {currentCliente.nome}{" "}
          {currentCliente.cognome}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Annulla
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Elimina
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ClientiListComponent;

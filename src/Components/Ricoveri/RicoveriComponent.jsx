import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Spinner,
  Alert,
  Button,
  Form,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import {
  getAllRicoveri,
  getActiveRicoveri,
  searchRicoveri,
} from "../../Redux/Actions/ricoveriActions";
import CreateRicoveroModal from "./CreateRicoveroModal";
import UpdateRicoveroModal from "./UpdateRicoveroModal";
import DeleteRicoveroModal from "./DeleteRicoveroModal";
import ViewRicoveroModal from "./ViewRicoveroModal";

const RicoveriComponent = () => {
  const [ricoveri, setRicoveri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedRicovero, setSelectedRicovero] = useState(null);

  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    view: false,
  });

  const [searchParams, setSearchParams] = useState({
    puppyNome: "",
    dataInizioFrom: "",
    dataInizioTo: "",
    dataFineFrom: "",
    dataFineTo: "",
    soloAttivi: false,
  });

  useEffect(() => {
    fetchRicoveri();
  }, []);

  const fetchRicoveri = async () => {
    try {
      setLoading(true);
      const data = await getAllRicoveri();
      setRicoveri(data);
      setError(null);
    } catch (err) {
      setError("Errore nel caricamento dei ricoveri");
      console.error("Error fetching ricoveri:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchActiveRicoveri = async () => {
    try {
      setLoading(true);
      const data = await getActiveRicoveri();
      setRicoveri(data);
      setError(null);
    } catch (err) {
      setError("Errore nel caricamento dei ricoveri attivi");
      console.error("Error fetching active ricoveri:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = await searchRicoveri(searchParams);
      setRicoveri(data);
      setError(null);
    } catch (err) {
      setError("Errore nella ricerca dei ricoveri");
      console.error("Error searching ricoveri:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSearchParams((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetSearch = () => {
    setSearchParams({
      puppyNome: "",
      dataInizioFrom: "",
      dataInizioTo: "",
      dataFineFrom: "",
      dataFineTo: "",
      soloAttivi: false,
    });
    fetchRicoveri();
  };

  const toggleModal = (modalName, ricovero = null) => {
    setSelectedRicovero(ricovero);
    setModalState((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const handleRicoveroCreated = () => {
    fetchRicoveri();
    toggleModal("create");
  };

  const handleRicoveroUpdated = () => {
    fetchRicoveri();
    toggleModal("update");
  };

  const handleRicoveroDeleted = () => {
    setRicoveri((prev) =>
      prev.filter((r) => r.ricoveroId !== selectedRicovero.ricoveroId)
    );
    toggleModal("delete");
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString("it-IT");
  };

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center mb-4">Sezione Ricoveri</h4>

      <div className="d-flex justify-content-between mb-3">
        <div>
          <Button
            variant="outline-primary"
            className="me-2"
            onClick={() => setShowSearch(!showSearch)}
          >
            <i className="bi bi-search me-1"></i> Ricerca
          </Button>
          <Button
            variant="outline-success"
            className="me-2"
            onClick={fetchActiveRicoveri}
          >
            <i className="bi bi-filter me-1"></i> Solo Attivi
          </Button>
          <Button variant="outline-secondary" onClick={fetchRicoveri}>
            <i className="bi bi-arrow-repeat me-1"></i> Tutti
          </Button>
        </div>
        <Button variant="outline-primary" onClick={() => toggleModal("create")}>
          <i className="bi bi-plus"></i> Nuovo Ricovero
        </Button>
      </div>

      {showSearch && (
        <Card className="mb-4">
          <Card.Body>
            <Form onSubmit={handleSearch}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome Puppy</Form.Label>
                    <Form.Control
                      type="text"
                      name="puppyNome"
                      value={searchParams.puppyNome}
                      onChange={handleSearchInputChange}
                      placeholder="Cerca per nome puppy"
                    />
                  </Form.Group>
                </Col>
                <Col
                  md={6}
                  className="d-flex align-items-end justify-content-end"
                >
                  <Button
                    variant="secondary"
                    onClick={resetSearch}
                    className="me-2"
                  >
                    Reset
                  </Button>
                  <Button variant="primary" type="submit">
                    Cerca
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      )}

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
              <th>#</th>
              <th>Puppy</th>
              <th>Inizio</th>
              <th>Descrizione</th>
              <th>Fine</th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {ricoveri.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Nessun ricovero trovato
                </td>
              </tr>
            ) : (
              ricoveri.map((ricovero, index) => (
                <tr key={ricovero.ricoveroId}>
                  <td>{index + 1}</td>
                  <td>{ricovero.puppyNome}</td>
                  <td>{formatDate(ricovero.dataInizioRicovero) || "N/A"}</td>
                  <td>{ricovero.descrizione || "-"}</td>
                  <td>
                    {formatDate(ricovero.dataFineRicovero) || (
                      <Badge bg="warning" text="dark">
                        In corso
                      </Badge>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => toggleModal("update", ricovero)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => toggleModal("delete", ricovero)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => toggleModal("view", ricovero)}
                    >
                      <i className="bi bi-info-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Modals */}
      <CreateRicoveroModal
        show={modalState.create}
        handleClose={() => toggleModal("create")}
        onRicoveroCreated={handleRicoveroCreated}
      />

      {selectedRicovero && (
        <>
          <UpdateRicoveroModal
            show={modalState.update}
            handleClose={() => toggleModal("update")}
            ricoveroId={selectedRicovero.ricoveroId}
            onRicoveroUpdated={handleRicoveroUpdated}
          />

          <DeleteRicoveroModal
            show={modalState.delete}
            handleClose={() => toggleModal("delete")}
            ricoveroId={selectedRicovero.ricoveroId}
            ricoveroInfo={selectedRicovero}
            onRicoveroDeleted={handleRicoveroDeleted}
          />

          <ViewRicoveroModal
            show={modalState.view}
            handleClose={() => toggleModal("view")}
            ricoveroId={selectedRicovero.ricoveroId}
          />
        </>
      )}
    </Container>
  );
};

export default RicoveriComponent;

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

    return () => {
      setModalState({
        create: false,
        update: false,
        delete: false,
        view: false,
      });
      setSelectedRicovero(null);
    };
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
    const resetModals = {
      create: false,
      update: false,
      delete: false,
      view: false,
    };

    if (modalState[modalName] === true) {
      setSelectedRicovero(null);
      setModalState(resetModals);
    } else {
      setSelectedRicovero(ricovero);
      setModalState({
        ...resetModals,
        [modalName]: true,
      });
    }
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
            style={{ color: "#2A4D38" }}
            variant="outline-secondary"
            className="me-2"
            onClick={() => setShowSearch(!showSearch)}
          >
            <i className="bi bi-search me-1 " style={{ color: "#2A4D38" }}></i>{" "}
            Ricerca
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
        <Button
          variant="outline-secondary"
          style={{ color: "#2A4D38" }}
          onClick={() => toggleModal("create")}
        >
          <i className="bi bi-plus" style={{ color: "#2A4D38" }}></i> Nuovo
          Ricovero
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
              <th style={{ color: "#2A4D38" }}>#</th>
              <th style={{ color: "#2A4D38" }}>Puppy</th>
              <th style={{ color: "#2A4D38" }}>Inizio</th>
              <th style={{ color: "#2A4D38" }}>Descrizione</th>
              <th style={{ color: "#2A4D38" }}>Fine</th>
              <th style={{ color: "#2A4D38" }}>Azioni</th>
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
                  <td style={{ color: "#2A4D38" }}>{index + 1}</td>
                  <td style={{ color: "#2A4D38" }}>{ricovero.puppyNome}</td>
                  <td style={{ color: "#2A4D38" }}>
                    {formatDate(ricovero.dataInizioRicovero) || "N/A"}
                  </td>
                  <td style={{ color: "#2A4D38" }}>
                    {ricovero.descrizione || "-"}
                  </td>
                  <td>
                    {formatDate(ricovero.dataFineRicovero) || (
                      <Badge
                        bg={null}
                        style={{
                          color: "green",
                        }}
                      >
                        Ancora in Ricovero
                      </Badge>
                    )}
                  </td>

                  <td className="text-center">
                    <Button
                      variant="outline-muted"
                      style={{ color: "#2A4D38" }}
                      size="sm"
                      className="me-2"
                      onClick={() => toggleModal("update", ricovero)}
                    >
                      <i className="bi bi-pencil"></i>
                    </Button>
                    <Button
                      variant="outline-muted"
                      style={{ color: "#2A4D38" }}
                      size="sm"
                      className="me-2"
                      onClick={() => toggleModal("delete", ricovero)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                    <Button
                      variant="outline-muted"
                      style={{ color: "#2A4D38" }}
                      size="sm"
                      onClick={() => toggleModal("view", ricovero)}
                    >
                      <i className="bi bi-info-circle pe-sm-2 pe-md-0"></i>
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

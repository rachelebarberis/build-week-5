import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  getProdotti,
  getVenditeByFiscalCode,
} from "../Redux/Actions/farmaciaActions";
import CreateProdottoModal from "./Farmacia/CreateProdottoModal";
import UpdateProdottoModal from "./Farmacia/UpdateProdottoModal";
import DeleteProdottoModal from "./Farmacia/DeleteProdottoModal";
import ViewProdottoModal from "./Farmacia/ViewProdottoModal";

const Farmacia = () => {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchDate, setSearchDate] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [fiscalCode, setFiscalCode] = useState("");
  const [clientResults, setClientResults] = useState([]);
  const [clientLoading, setClientLoading] = useState(false);
  const [clientError, setClientError] = useState(null);
  const [selectedProdotto, setSelectedProdotto] = useState(null);

  const [modalState, setModalState] = useState({
    create: false,
    update: false,
    delete: false,
    view: false,
  });

  useEffect(() => {
    fetchProdotti();

    return () => {
      setModalState({
        create: false,
        update: false,
        delete: false,
        view: false,
      });
      setSelectedProdotto(null);
    };
  }, []);

  const fetchProdotti = async () => {
    try {
      setLoading(true);
      const response = await getProdotti();
      if (response && response.products) {
        setProdotti(response.products);
      }
      setError(null);
    } catch (err) {
      setError(
        "Errore nel caricamento dei prodotti: " +
          (err.message || "Errore sconosciuto")
      );
      console.error("Errore nel caricamento dei prodotti:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDateSearch = async (e) => {
    e.preventDefault();
    if (!searchDate) return;

    try {
      setLoading(true);
      //ricerca per data da implementare (mi sono dimenticato di farla)

      const filteredProducts = prodotti.filter(
        (prodotto) =>
          prodotto.dataDiAcquisto &&
          prodotto.dataDiAcquisto.includes(searchDate)
      );
      setSearchResults(filteredProducts);
    } catch (err) {
      setError(
        "Errore nella ricerca per data: " +
          (err.message || "Errore sconosciuto")
      );
    } finally {
      setLoading(false);
    }
  };

  //ricerca per codice fiscale
  const handleFiscalCodeSearch = async (e) => {
    e.preventDefault();
    if (!fiscalCode) return;

    try {
      setClientLoading(true);
      setClientError(null);
      const response = await getVenditeByFiscalCode(fiscalCode);
      setClientResults(response || []);
    } catch (err) {
      setClientError(
        "Errore nella ricerca per codice fiscale: " +
          (err.message || "Errore sconosciuto")
      );
      console.error("Errore nella ricerca per codice fiscale:", err);
    } finally {
      setClientLoading(false);
    }
  };

  const toggleModal = (modalName, prodotto = null) => {
    const resetModals = {
      create: false,
      update: false,
      delete: false,
      view: false,
    };

    if (modalState[modalName] === true) {
      setSelectedProdotto(null);
      setModalState(resetModals);
    } else {
      setSelectedProdotto(prodotto);
      setModalState({
        ...resetModals,
        [modalName]: true,
      });
    }
  };

  const handleProdottoCreated = () => {
    fetchProdotti();
    toggleModal("create");
  };

  const handleProdottoUpdated = () => {
    fetchProdotti();
    toggleModal("update");
  };

  const handleProdottoDeleted = () => {
    setProdotti((prev) => prev.filter((p) => p.id !== selectedProdotto.id));
    toggleModal("delete");
  };

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center">Farmacia Interna</h4>
      <h6 className="text-center pt-2">Lista Prodotti</h6>

      <div className="d-flex justify-content-end mb-3">
        <Button
          style={{ color: "#2A4D38" }}
          variant="outline-secondary"
          onClick={() => toggleModal("create")}
        >
          <i className="bi bi-plus" style={{ color: "#2A4D38" }}></i> Nuovo
          Prodotto
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </Spinner>
        </div>
      ) : (
        <Table striped bordered hover responsive className="mb-md-5">
          <thead>
            <tr>
              <th style={{ color: "#2A4D38" }}>Nome</th>
              <th style={{ color: "#2A4D38" }}>Uso</th>
              <th style={{ color: "#2A4D38" }}>Armadietto</th>
              <th style={{ color: "#2A4D38" }}>Cassetto</th>
              <th style={{ color: "#2A4D38" }}>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {prodotti.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">
                  Nessun prodotto trovato
                </td>
              </tr>
            ) : (
              prodotti.map((prodotto) => (
                <tr key={prodotto.id}>
                  <td style={{ color: "#2A4D38" }}>{prodotto.nome}</td>
                  <td style={{ color: "#2A4D38" }}>
                    {prodotto.usiProdotto || "Non specificato"}
                  </td>
                  <td style={{ color: "#2A4D38" }} className="text-center">
                    {prodotto.cassetto?.armadiettoId || "N/A"}
                  </td>
                  <td style={{ color: "#2A4D38" }} className="text-center">
                    {prodotto.cassetto?.cassettoId || "N/A"}
                  </td>
                  <td>
                    <Button
                      style={{ color: "#2A4D38" }}
                      variant="outline-muted"
                      size="sm"
                      className="me-2"
                      onClick={() => toggleModal("update", prodotto)}
                    >
                      <i
                        className="bi bi-pencil"
                        style={{ color: "#2A4D38" }}
                      ></i>
                    </Button>
                    <Button
                      style={{ color: "#2A4D38" }}
                      variant="outline-muted"
                      size="sm"
                      className="me-2"
                      onClick={() => toggleModal("delete", prodotto)}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                    <Button
                      style={{ color: "#2A4D38" }}
                      variant="outline-muted"
                      size="sm"
                      onClick={() => toggleModal("view", prodotto)}
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

      <Row className="pb-5">
        <Col lg={6} className="text-center pt-3 border border-bottom-0">
          <Row className="justify-content-between align-items-center">
            <Col xs={6}>
              <p className="fw-semibold">Ricerca per Data</p>
            </Col>
            <Col xs={6}>
              <Form onSubmit={handleDateSearch}>
                <Row className="justify-content-center pb-2">
                  <Col xs="auto" className="p-0 pe-2">
                    <InputGroup>
                      <Form.Control
                        style={{ color: "grey" }}
                        type="date"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="outline-muted"
                        style={{ backgroundColor: "white" }}
                      >
                        <i className="bi bi-search"></i>
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <hr></hr>
          <div>
            <p className="text-center fw-semibold">Lista ricerca:</p>
            <Table striped bordered hover responsive className="border">
              <thead>
                <tr>
                  <th style={{ color: "#2A4D38" }}>Prodotto</th>
                  <th style={{ color: "#2A4D38" }}>Data</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.length === 0 ? (
                  <tr>
                    <td
                      colSpan="2"
                      className="text-center"
                      style={{ color: "#2A4D38" }}
                    >
                      Nessun risultato trovato
                    </td>
                  </tr>
                ) : (
                  searchResults.map((prodotto, index) => (
                    <tr key={index}>
                      <td>{prodotto.nome}</td>
                      <td>{prodotto.dataDiAcquisto}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Col>

        <Col lg={6} className="text-center pt-3 border border-bottom-0">
          <Row className="justify-content-between align-items-center">
            <Col xs={6}>
              <p className="fw-semibold">Ricerca per Codice Fiscale</p>
            </Col>
            <Col xs={6}>
              <Form onSubmit={handleFiscalCodeSearch}>
                <Row className="justify-content-center pb-2">
                  <Col xs="auto" className="p-0 pe-2">
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Codice Fiscale"
                        value={fiscalCode}
                        onChange={(e) => setFiscalCode(e.target.value)}
                      />
                      <Button
                        type="submit"
                        variant="outline-muted"
                        style={{ backgroundColor: "white" }}
                      >
                        <i className="bi bi-search"></i>
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <hr></hr>
          <div>
            <p className="text-center fw-semibold">Lista ricerca:</p>
            {clientError && <Alert variant="danger">{clientError}</Alert>}
            {clientLoading ? (
              <div className="text-center my-4">
                <Spinner animation="border" size="sm" />
              </div>
            ) : (
              <Table striped bordered hover responsive className="border">
                <thead>
                  <tr>
                    <th style={{ color: "#2A4D38" }}>Prodotto</th>
                    <th style={{ color: "#2A4D38" }}>Cliente</th>
                  </tr>
                </thead>
                <tbody>
                  {clientResults.length === 0 ? (
                    <tr>
                      <td
                        style={{ color: "#2A4D38" }}
                        colSpan="2"
                        className="text-center"
                      >
                        Nessun risultato trovato
                      </td>
                    </tr>
                  ) : (
                    clientResults.map((vendita, index) => (
                      <tr key={index}>
                        <td>{vendita.nomeProdotto}</td>
                        <td>{vendita.userName}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>

      {/* Modals */}
      <CreateProdottoModal
        show={modalState.create}
        handleClose={() => toggleModal("create")}
        onProdottoCreated={handleProdottoCreated}
      />

      {selectedProdotto && (
        <>
          <UpdateProdottoModal
            show={modalState.update}
            handleClose={() => toggleModal("update")}
            prodottoId={selectedProdotto.id}
            onProdottoUpdated={handleProdottoUpdated}
          />

          <DeleteProdottoModal
            show={modalState.delete}
            handleClose={() => toggleModal("delete")}
            prodottoId={selectedProdotto.id}
            prodottoInfo={selectedProdotto}
            onProdottoDeleted={handleProdottoDeleted}
          />

          <ViewProdottoModal
            show={modalState.view}
            handleClose={() => toggleModal("view")}
            prodottoId={selectedProdotto.id}
          />
        </>
      )}
    </Container>
  );
};

export default Farmacia;

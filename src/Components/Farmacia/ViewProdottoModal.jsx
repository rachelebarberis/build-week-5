import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import { getProdottoById } from "../../Redux/Actions/farmaciaActions";

const ViewProdottoModal = ({ show, handleClose, prodottoId }) => {
  const [prodotto, setProdotto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (show && prodottoId) {
      fetchProdottoDetails();
    }
  }, [show, prodottoId]);

  const fetchProdottoDetails = async () => {
    try {
      setLoading(true);
      const response = await getProdottoById(prodottoId);
      console.log("API Response:", response);

      if (response && response.product) {
        setProdotto(response.product);
      } else {
        setError("Dati del prodotto non trovati nella risposta");
      }
    } catch (err) {
      setError("Errore nel caricamento dei dettagli del prodotto");
      console.error("Error fetching prodotto details:", err);
    } finally {
      setLoading(false);
    }
  };

  const displayValue = (value, defaultText = "Non specificato") => {
    if (!value) {
      return <Badge bg="secondary">{defaultText}</Badge>;
    }
    return value;
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title id="verde">Dettagli Prodotto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Caricamento...</span>
            </Spinner>
          </div>
        ) : prodotto ? (
          <Card className="shadow-sm p-3">
            <Card.Body>
              <h5 className="mb-3 fs-3" id="verde">
                Informazioni Prodotto
              </h5>
              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  Nome:
                </Col>
                <Col md={8}>{displayValue(prodotto.nome)}</Col>
              </Row>

              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  Usi Prodotto:
                </Col>
                <Col md={8}>{displayValue(prodotto.usiProdotto)}</Col>
              </Row>

              <hr />

              <h5 id="verde" className="mb-3 fs-3">
                Fornitore
              </h5>
              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  Nome:
                </Col>
                <Col md={8}>{displayValue(prodotto.fornitore?.nome)}</Col>
              </Row>

              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  Recapito:
                </Col>
                <Col md={8}>{displayValue(prodotto.fornitore?.recapito)}</Col>
              </Row>

              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  Indirizzo:
                </Col>
                <Col md={8}>{displayValue(prodotto.fornitore?.indirizzo)}</Col>
              </Row>

              <hr />

              <h5 id="verde" className="mb-3 fs-3">
                Posizione in Magazzino
              </h5>
              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  ID Armadietto:
                </Col>
                <Col md={8}>
                  {displayValue(prodotto.cassetto?.armadiettoId)}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  ID Cassetto:
                </Col>
                <Col md={8}>{displayValue(prodotto.cassetto?.cassettoId)}</Col>
              </Row>

              <hr />

              <h5 id="verde" className="mb-3 fs-3">
                Vendite
              </h5>
              <Row className="mb-3">
                <Col id="verde" md={4} className="fw-bold">
                  Numero di vendite:
                </Col>
                <Col md={8}>
                  {prodotto.vendite && prodotto.vendite.length > 0 ? (
                    <Badge bg="success">
                      {prodotto.vendite.length} vendite registrate
                    </Badge>
                  ) : (
                    <Badge
                      bg={null}
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      Nessuna vendita per questo prodotto
                    </Badge>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ) : (
          <div id="verde" className="text-center">
            Nessun dettaglio disponibile
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose} className="px-4">
          <i className="bi bi-x-circle me-1"></i>
          Chiudi
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewProdottoModal;

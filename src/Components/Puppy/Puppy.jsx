import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchPuppies } from "../../Redux/Actions/puppiesActions";

const Puppy = () => {
  const [microchip, setMicrochip] = useState("");
  const [filteredPuppy, setFilteredPuppy] = useState(null);
  const dispatch = useDispatch();

  const { puppies, loading, error } = useSelector((state) => state.puppies);

  useEffect(() => {
    dispatch(fetchPuppies());
  }, [dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();

    const puppyFound = puppies.find(
      (puppy) => puppy.numeroMicrochip === microchip
    );

    if (puppyFound) {
      setFilteredPuppy(puppyFound);
    } else {
      setFilteredPuppy(null);
    }
  };

  const PuppyCard = ({ puppy }) => (
    <Card
      key={puppy.puppyId}
      className="mt-3 mx-auto rounded-3"
      style={{ maxWidth: "500px" }}
    >
      <Card.Body>
        <h5 className="text-center" style={{ color: "#2A4D38" }}>
          {puppy.nome}
        </h5>
        <hr />
        <p>
          <i className="bi bi-tags text-success me-2"></i>
          <strong>Razza:</strong> {puppy.tipologia || "Non specificata"}
        </p>
        <p>
          <i className="bi bi-palette text-success me-2"></i>
          <strong>Colore Mantello:</strong>{" "}
          {puppy.coloreMantello || "Non specificato"}
        </p>
        <p>
          <i className="bi bi-calendar-event text-success me-2"></i>
          <strong>Data di Nascita:</strong>{" "}
          {puppy.dataNascita || "Non specificata"}
        </p>
        <p>
          <i className="bi bi-upc-scan text-success me-2"></i>
          <strong>Numero Microchip:</strong>{" "}
          {puppy.numeroMicrochip || "Non disponibile"}
        </p>
      </Card.Body>
    </Card>
  );

  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h1 className="text-center">Cerca il tuo puppy!</h1>
      <p className="text-center">
        Inserisci il Microchip del tuo puppy, speriamo di riuscire ad aiutarti!
      </p>

      {/* Form di ricerca */}
      <Form onSubmit={handleSearch}>
        <Row className="justify-content-center pt-2">
          <Col xs="auto" className="p-0">
            <Form.Control
              type="text"
              placeholder="Numero Microchip"
              className="mr-sm-2"
              value={microchip}
              onChange={(e) => setMicrochip(e.target.value)}
              required
            />
          </Col>
          <Col xs="auto" className="p-0 ps-1">
            <Button
              id="addbtn"
              type="submit"
              className="bg-transparent"
              variant="outline-white"
            >
              <i id="verde" className="bi bi-search-heart"></i>
            </Button>
          </Col>
        </Row>
      </Form>

      <div className="pt-3 text-center">
        <p className="fw-semibold">Ecco i risultati della tua ricerca!</p>

        {loading && <p>🔍 Ricerca in corso...</p>}
        {error && <p className="text-danger">❌ {error}</p>}

        {filteredPuppy ? (
          <Card className="mt-3 rounded-3">
            <Card.Body>
              <h5>🐶 {filteredPuppy.nome}</h5>
              <p>
                <strong>Razza:</strong> {filteredPuppy.tipologia}
              </p>
              <p>
                <strong>Colore Mantello:</strong> {filteredPuppy.coloreMantello}
              </p>
              <p>
                <strong>Data di Nascita:</strong> {filteredPuppy.dataNascita}
              </p>
              <p>
                <strong>Numero Microchip:</strong>{" "}
                {filteredPuppy.numeroMicrochip}
              </p>
              <p>
                <strong>Proprietario:</strong>{" "}
                {filteredPuppy.cliente?.nome || "Nessuno"}{" "}
                {filteredPuppy.cliente?.cognome || ""}
              </p>
            </Card.Body>
          </Card>
        ) : (
          <>
            {puppies.filter((puppy) => !puppy.cliente || !puppy.clienteId)
              .length > 0 ? (
              puppies
                .filter((puppy) => !puppy.cliente || !puppy.clienteId)
                .map((puppy) => (
                  <Card key={puppy.puppyId} className="mt-3 rounded-3">
                    <Card.Body>
                      <h5>🐶 {puppy.nome}</h5>
                      <p>
                        <strong>Razza:</strong> {puppy.tipologia}
                      </p>
                      <p>
                        <strong>Colore Mantello:</strong> {puppy.coloreMantello}
                      </p>
                      <p>
                        <strong>Data di Nascita:</strong> {puppy.dataNascita}
                      </p>
                      <p>
                        <strong>Numero Microchip:</strong>{" "}
                        {puppy.numeroMicrochip}
                      </p>
                      <p>
                        <strong>Proprietario:</strong> Nessuno
                      </p>
                    </Card.Body>
                  </Card>
                ))
            ) : (
              <p className="text-muted">
                Nessun puppy senza proprietario disponibile.
              </p>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default Puppy;

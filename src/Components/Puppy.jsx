import { Container, Row, Col, Form, Button } from "react-bootstrap";
const Puppy = () => {
  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h1 className="text-center">Cerca il tuo puppy!</h1>
      <p className="text-center">
        Inserisci il Microchip del tuo puppy, speriamo di riuscire ad aiutarti!
      </p>
      <Form inline>
        <Row className="justify-content-end pt-2">
          <Col xs="auto" className="p-0">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto" className="p-0 ps-1">
            <Button type="submit" className=" btn-secondary">
              <i class="bi bi-search-heart"></i>
            </Button>
          </Col>
        </Row>
      </Form>
      <div className="pt-3">
        <p className="fw-semibold">Ecco i risultati della tua ricerca!</p>
      </div>
    </Container>
  );
};
export default Puppy;

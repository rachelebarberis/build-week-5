import {
  Container,
  Table,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";

const Farmacia = () => {
  return (
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <h4 className="text-center">Farmacia Interna</h4>
      <h6 className="text-center pt-2">Lista Prodotti</h6>
      <div className="d-flex justify-content-end">
        <a className="btn btn-sm border border-2 rounded-1">
          <i class="bi bi-plus text-black"></i>
        </a>
      </div>
      <Table striped className=" mb-md-5">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Uso</th>
            <th>Armadietto</th>
            <th>Cassetto</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Convenia</td>
            <td>Antibiotico</td>
            <td>1</td>
            <td>1</td>
            <td>
              <i class="bi bi-pencil-square"></i>
              <i class="bi bi-trash"></i>
              <i class="bi bi-info-square"></i>
            </td>
          </tr>
        </tbody>
      </Table>

      <Row className="pb-5">
        <Col lg={6} className="text-center pt-3 border border-bottom-0">
          <Row className="justify-content-between align-items-center">
            <Col xs={6}>
              <p className="fw-semibold">Ricerca per Data</p>
            </Col>
            <Col xs={6}>
              <Form inline>
                <Row className="justify-content-center pb-2">
                  <Col xs="auto" className="p-0 pe-2">
                    <InputGroup>
                      <Form.Control type="date" />
                      <InputGroup.Text>
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <hr></hr>
          <div>
            <p className="text-center fw-semibold">Lista ricerca:</p>
            <Table striped className="border">
              <thead>
                <tr>
                  <th>Prodotto</th>
                  <th>Data</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Convesia</td>
                  <td>01/04/2025</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
        <Col lg={6} className="text-center pt-3 border border-bottom-0">
          <Row className="justify-content-between align-items-center">
            <Col xs={6}>
              {" "}
              <p className="fw-semibold">Ricerca per Codice Fiscale</p>
            </Col>
            <Col xs={6}>
              {" "}
              <Form inline>
                <Row className="justify-content-center pb-2">
                  <Col xs="auto" className="p-0 pe-2">
                    <InputGroup>
                      <Form.Control type="text" placeholder="Search" />{" "}
                      <InputGroup.Text>
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>

          <hr></hr>
          <div>
            <p className="text-center fw-semibold">Lista ricerca:</p>
            <Table striped className="border">
              <thead>
                <tr>
                  <th>Prodotto</th>
                  <th>Cliente</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Convesia</td>
                  <td>Vittorio Turiaci</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default Farmacia;

import { Container, Form, Button } from "react-bootstrap";

const LoginComponent = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-start align-items-center pb-5"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <h4 className="mb-3">Accedi qui!</h4>
      <p className="text-muted">
        Inserisci email e password per accedere al gestionale della clinica
        veterinaria.
      </p>

      <Form className="w-50 mt-4">
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Inserisci la tua email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Inserisci la tua password"
            required
          />
        </Form.Group>

        <Button type="submit" className="btn btn-sm btn-secondary">
          Accedi
        </Button>
      </Form>

      <hr className="w-50 my-4" />

      <div className="text-center">
        <h5 className="mb-3">Non hai un account?</h5>
        <p className="text-muted">
          Registrati ora per accedere a tutte le funzionalità
        </p>
        <Button className="btn btn-secondary btn-sm">Registrati</Button>
      </div>
    </Container>
  );
};

export default LoginComponent;

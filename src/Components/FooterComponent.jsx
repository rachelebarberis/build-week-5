import { Container } from "react-bootstrap";

const FooterComponent = () => (
  <footer className="mt-auto py-3" id="footer">
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="text-center">
        <span>
          <strong>Clinica Veterinaria - Prenditi cura dei tuoi Puppies</strong>{" "}
          - Copyright {new Date().getFullYear()}
        </span>
      </div>
    </Container>
  </footer>
);

export default FooterComponent;

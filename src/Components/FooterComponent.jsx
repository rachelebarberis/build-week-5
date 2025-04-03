import { Container } from "react-bootstrap";
const FooterComponent = () => (
  <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
    <footer className="  mt-5 mb-0 " id="footer">
      <span
        className=" m-auto p-2 d-flex justify-content-center"
        style={{ color: "#2A4D38;" }}
      >
        <strong style={{ color: "#2A4D38;" }}>
          Clinica Veterinaria - Prenditi cura dei tuoi Puppies
        </strong>{" "}
        - Copyright {new Date().getFullYear()}
      </span>{" "}
    </footer>
  </Container>
);

export default FooterComponent;

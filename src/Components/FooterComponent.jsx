import { Container } from "react-bootstrap";

const FooterComponent = () => (
  <footer className="py-3 border-top mt-3" id="footer">
    <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="text-center">
        <span>
          {/* <div className="text-center"> <img src="/public/images/footer1.jpg" id="imgfooter"></img> </div>*/}
          <strong>Clinica Veterinaria - Prenditi cura dei tuoi Puppies</strong>{" "}
          - Copyright {new Date().getFullYear()}
        </span>
      </div>
    </Container>
  </footer>
);

export default FooterComponent;

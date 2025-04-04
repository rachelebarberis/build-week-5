import { Container } from "react-bootstrap";
const FooterComponent = () => (
  <Container style={{ fontFamily: "'Poppins', sans-serif" }}>
    <footer className="  mt-5 mb-0" id="footer">
      <span className=" m-auto p-2 d-flex justify-content-center">
        <strong>Clinica Veterinaria - Prenditi cura dei tuoi Puppies</strong> -
        Copyright {new Date().getFullYear()}
      </span>{" "}
      {/* <div className="text-center">
        <img src="/public/images/footer1.jpg" id="imgfooter"></img>
      </div>*/}
    </footer>
  </Container>
);

export default FooterComponent;

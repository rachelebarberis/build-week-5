import { Nav, Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const NavBarComponent = () => {
  return (
    <Navbar expand="md" className="bg-body-dark pt-0">
      <Container fluid={true} style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Navbar.Brand href="/" className="m-0 p-0">
          <img src="/public/images/navbar.jpg" id="imglogo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          <Nav className="me-auto">
            <Link to="/elencopuppy" className="nav-link  text-dark">
              Puppies
            </Link>
            <Link to="/visite" className="nav-link  text-dark">
              Visite
            </Link>
            <Link to="/ricoveri" className="nav-link  text-dark">
              Ricoveri
            </Link>

            <Link to="/farmacia" className="nav-link  text-dark">
              Farmacia
            </Link>
            <Link to="/account" className="nav-link  text-dark">
              Account
            </Link>
          </Nav>
          <Nav>
            <Link
              to="/puppy"
              className="nav-link  text-dark justify-content-end"
            >
              Cerca il tuo puppy
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;

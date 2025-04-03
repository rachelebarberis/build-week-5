import { Nav, Navbar, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOGOUT } from "../Redux/Actions/authActions";

const NavBarComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Navbar expand="md" className=" pt-0" style={{ color: "rgb(42, 77, 56)" }}>
      <Container fluid={true} style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Navbar.Brand href="/" className="m-0 p-0">
          <img src="/public/images/navbar.jpg" id="imglogo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-between"
        >
          {!isAuthenticated && (
            <Nav className="me-auto">
              <Link to="/account" className=" nav-link  ">
                Account
              </Link>
            </Nav>
          )}
          {isAuthenticated && (
            <Nav className="me-auto">
              <Link to="/elencopuppy" className=" nav-link  ">
                Puppies
              </Link>
              <Link to="/visite" className=" nav-link  ">
                Visite
              </Link>
              <Link to="/ricoveri" className=" nav-link  ">
                Ricoveri
              </Link>

              <Link to="/farmacia" className=" nav-link  ">
                Farmacia
              </Link>
              <Link to="/clientiList" className=" nav-link  ">
                Clienti
              </Link>
              <Link onClick={LOGOUT} className=" nav-link  text-danger">
                Logout
              </Link>
            </Nav>
          )}

          <Nav>
            <Link to="/puppy" className=" nav-link   justify-content-end">
              Cerca il tuo puppy
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarComponent;

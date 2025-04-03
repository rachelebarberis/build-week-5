import { Nav, Navbar, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/Actions/authActions';

const NavBarComponent = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  return (
    <Navbar expand='md' className='bg-body-dark pt-0'>
      <Container fluid={true} style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Link to='/' className='m-0 p-0'>
          <img src='/public/images/navbar.jpg' id='imglogo' />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse
          id='basic-navbar-nav'
          className='justify-content-between'
        >
          {!isAuthenticated && (
            <Nav className='me-auto'>
              <Link to='/account' className='nav-link  text-dark'>
                Account
              </Link>
            </Nav>
          )}
          {isAuthenticated && (
            <Nav className='me-auto'>
              <Link to='/elencopuppy' className='nav-link  text-dark'>
                Puppies
              </Link>
              <Link to='/visite' className='nav-link  text-dark'>
                Visite
              </Link>
              <Link to='/ricoveri' className='nav-link  text-dark'>
                Ricoveri
              </Link>

              <Link to='/farmacia' className='nav-link  text-dark'>
                Farmacia
              </Link>
              <Link to='/register' className='nav-link  text-dark'>
                Aggiungi Utente
              </Link>
              <Link
                to='/'
                onClick={() => dispatch(logout())}
                className='nav-link text-danger'
              >
                Logout
              </Link>
            </Nav>
          )}

          <Nav>
            <Link
              to='/puppy'
              className='nav-link  text-dark justify-content-end'
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

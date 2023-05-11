import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

function MyNavbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // some check somehow
  }, [isLoggedIn]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-5">
      <Container>
        <Navbar.Brand><Link to="/"> My Application</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          {!isLoggedIn ?
            <Nav>
              <Nav.Link>
                <Link to="/login"> Log In </Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/signup"> Sign In </Link>
              </Nav.Link>
            </Nav>
            :
            <Nav>
              <Nav.Link>
                <Link to="/logout"> Log Out </Link>
              </Nav.Link>
            </Nav>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
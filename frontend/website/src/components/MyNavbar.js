import Container from 'react-bootstrap/Container';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios';

function MyNavbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // some check somehow
    axios.get("http://localhost:5003/checkLogin", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          console.log("logged in");
          setIsLoggedIn(true);
        } else {
          console.log("not logged in");
          setIsLoggedIn(false);
        }
      })
      .catch((error) => {
        console.log(error);
      }
      );

  }, [isLoggedIn]);

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-5">
      <Container>
        <Navbar.Brand><Link to="/">AI Tweet Creator</Link></Navbar.Brand>
        {!isLoggedIn ?
          <div>
            <Nav className='me-auto'>
              <Link to="/login"> Log In </Link>
            </Nav>
            <Nav className='me-auto'>
              <Link to="/signup"> Sign In </Link>
            </Nav>
          </div>
          :
          <Nav className='me-auto'>
            <Link to="/logout"> Log Out </Link>
          </Nav>}
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function BasicNavbar() {
  return (
    <Navbar className="custom-navbar" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">🚀 TechHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">🏠 Home</Nav.Link>
            <Nav.Link href="#about">👨‍💻 About</Nav.Link>
            <Nav.Link href="#services">⚡ Services</Nav.Link>
            <Nav.Link href="#contact">📧 Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicNavbar;
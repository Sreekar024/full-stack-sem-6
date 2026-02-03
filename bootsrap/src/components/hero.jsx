import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function HeroSection() {
  return (
    <Container fluid className="bg-primary text-white py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="display-4">Welcome to Our Website</h1>
            <p className="lead">Full Stack Development - Semester 6 Project</p>
            <Button variant="light" size="lg">Get Started</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default HeroSection;
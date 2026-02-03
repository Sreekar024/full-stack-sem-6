import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function HeroSection() {
  return (
    <Container fluid className="hero-animated text-white py-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h1 className="display-3">🎆 Innovation Starts Here</h1>
            <p className="lead fs-4">Full Stack Development - Semester 6 | Sreekar's Project</p>
            <Button className="btn-custom me-3" size="lg">🚀 Explore Now</Button>
            <Button variant="outline-light" size="lg">📚 Learn More</Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default HeroSection;
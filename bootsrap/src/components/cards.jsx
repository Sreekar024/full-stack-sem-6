import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function CardsSection() {
  const navigate = useNavigate();

  return (
    <Container className="py-5">
      <Row>
        <Col md={4} className="mb-4">
          <Card className="gradient-card hover-lift h-100">
            <Card.Body className="text-center">
              <div className="fs-1 mb-3">🌐</div>
              <Card.Title>Web Development</Card.Title>
              <Card.Text>
                Modern web development using React, Bootstrap and cutting-edge technologies.
              </Card.Text>
              <Button variant="light" onClick={() => navigate('/web-development')}>🔍 Discover</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="gradient-card-2 hover-lift h-100">
            <Card.Body className="text-center">
              <div className="fs-1 mb-3">🛠️</div>
              <Card.Title>Full Stack</Card.Title>
              <Card.Text>
                Complete full stack development with modern frontend and robust backend solutions.
              </Card.Text>
              <Button variant="light" onClick={() => navigate('/full-stack')}>⚡ Build</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="gradient-card-3 hover-lift h-100">
            <Card.Body className="text-center">
              <div className="fs-1 mb-3">🎨</div>
              <Card.Title>UI/UX Design</Card.Title>
              <Card.Text>
                Beautiful responsive design using Bootstrap components and custom animations.
              </Card.Text>
              <Button variant="light" onClick={() => navigate('/ui-ux-design')}>🎆 Create</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CardsSection;
import BasicNavbar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function About() {
  return (
    <div>
      <BasicNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-5">About This Project</h1>
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <Card className="shadow">
              <Card.Body>
                <Card.Title>Full Stack Development - Semester 6</Card.Title>
                <Card.Text>
                  This project demonstrates the use of React with Bootstrap components
                  and React Router for navigation. Built as part of the Full Stack
                  Development course by Sreekar.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>⚛️ React</Card.Title>
                <Card.Text>Modern UI library for building interactive interfaces</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>🎨 Bootstrap</Card.Title>
                <Card.Text>Responsive design framework with pre-built components</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>🔀 React Router</Card.Title>
                <Card.Text>Client-side routing for seamless page navigation</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;

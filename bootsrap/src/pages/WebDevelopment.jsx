import BasicNavbar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function WebDevelopment() {
  return (
    <div>
      <BasicNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">🌐 Web Development</h1>
        <Card className="shadow">
          <Card.Body>
            <Card.Text className="fs-5">
              Modern web development using React, Bootstrap and cutting-edge technologies.
              Build responsive, interactive web applications with the latest tools and frameworks.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default WebDevelopment;

import BasicNavbar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function Frontend() {
  return (
    <div>
      <BasicNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">🚀 Frontend Development</h1>
        <Card className="shadow">
          <Card.Body>
            <Card.Text className="fs-5">
              Master frontend technologies including React, JavaScript, HTML, and CSS.
              Build interactive and dynamic user interfaces.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Frontend;

import BasicNavbar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function Backend() {
  return (
    <div>
      <BasicNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">🛠️ Backend Development</h1>
        <Card className="shadow">
          <Card.Body>
            <Card.Text className="fs-5">
              Build robust server-side applications with Node.js, databases, and APIs.
              Handle data processing and business logic efficiently.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Backend;

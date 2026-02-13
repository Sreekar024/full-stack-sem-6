import BasicNavbar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function FullStack() {
  return (
    <div>
      <BasicNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">🛠️ Full Stack Development</h1>
        <Card className="shadow">
          <Card.Body>
            <Card.Text className="fs-5">
              Complete full stack development with modern frontend and robust backend solutions.
              Master both client and server-side technologies.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default FullStack;

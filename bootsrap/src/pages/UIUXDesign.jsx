import BasicNavbar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function UIUXDesign() {
  return (
    <div>
      <BasicNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">🎨 UI/UX Design</h1>
        <Card className="shadow">
          <Card.Body>
            <Card.Text className="fs-5">
              Beautiful responsive design using Bootstrap components and custom animations.
              Create stunning user interfaces with modern design principles.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default UIUXDesign;

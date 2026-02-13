import BasicNavbar from "../components/navbar";
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function DataScience() {
  return (
    <div>
      <BasicNavbar />
      <Container className="py-5">
        <h1 className="text-center mb-4">📊 Data Science</h1>
        <Card className="shadow">
          <Card.Body>
            <Card.Text className="fs-5">
              Analyze data, build machine learning models, and extract insights.
              Work with Python, statistics, and data visualization tools.
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default DataScience;

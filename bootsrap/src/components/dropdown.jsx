import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function BasicExample() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h3 className="mb-4">📦 Interactive Components</h3>
      <Dropdown>
        <Dropdown.Toggle className="btn-custom" id="dropdown-basic">
          🌈 Choose Your Path
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate('/frontend')}>🚀 Frontend Development</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/backend')}>🛠️ Backend Development</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/ui-ux-design')}>🎨 UI/UX Design</Dropdown.Item>
          <Dropdown.Item onClick={() => navigate('/data-science')}>📊 Data Science</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default BasicExample;
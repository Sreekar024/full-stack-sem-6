import Dropdown from 'react-bootstrap/Dropdown';

function BasicExample() {
  return (
    <div className="text-center">
      <h3 className="mb-4">📦 Interactive Components</h3>
      <Dropdown>
        <Dropdown.Toggle className="btn-custom" id="dropdown-basic">
          🌈 Choose Your Path
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">🚀 Frontend Development</Dropdown.Item>
          <Dropdown.Item href="#/action-2">🛠️ Backend Development</Dropdown.Item>
          <Dropdown.Item href="#/action-3">🎨 UI/UX Design</Dropdown.Item>
          <Dropdown.Item href="#/action-4">📊 Data Science</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default BasicExample;
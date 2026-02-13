import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import About from "./pages/About";
import WebDevelopment from "./pages/WebDevelopment";
import FullStack from "./pages/FullStack";
import UIUXDesign from "./pages/UIUXDesign";
import Frontend from "./pages/Frontend";
import Backend from "./pages/Backend";
import DataScience from "./pages/DataScience";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/web-development" element={<WebDevelopment />} />
        <Route path="/full-stack" element={<FullStack />} />
        <Route path="/ui-ux-design" element={<UIUXDesign />} />
        <Route path="/frontend" element={<Frontend />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/data-science" element={<DataScience />} />
      </Routes>
    </Router>
  );
}

export default App;
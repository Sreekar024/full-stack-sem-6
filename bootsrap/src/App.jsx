import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SkillsProvider } from './context/SkillsContext';
import Home from "./pages/Home";
import About from "./pages/About";
import WebDevelopment from "./pages/WebDevelopment";
import FullStack from "./pages/FullStack";
import UIUXDesign from "./pages/UIUXDesign";
import Frontend from "./pages/Frontend";
import Backend from "./pages/Backend";
import DataScience from "./pages/DataScience";
import Portfolio from "./pages/Portfolio";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

function App() {
  return (
    <SkillsProvider>
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
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </Router>
    </SkillsProvider>
  );
}

export default App;
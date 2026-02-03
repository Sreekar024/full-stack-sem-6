import BasicExample from "./components/dropdown";
import BasicNavbar from "./components/navbar";
import HeroSection from "./components/hero";
import CardsSection from "./components/cards";
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css';

function App() {
  return (
    <div>
      <BasicNavbar />
      <HeroSection />
      <CardsSection />
      <div className="gradient-bg py-5">
        <div className="container">
          <BasicExample />
        </div>
      </div>
    </div>
  );
}

export default App;
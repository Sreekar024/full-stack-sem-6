import BasicExample from "./components/dropdown";
import BasicNavbar from "./components/navbar";
import HeroSection from "./components/hero";
import CardsSection from "./components/cards";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <BasicNavbar />
      <HeroSection />
      <CardsSection />
      <div style={{ padding: "50px" }}>
        <h2>Bootstrap Components</h2>
        <BasicExample />
      </div>
    </div>
  );
}

export default App;
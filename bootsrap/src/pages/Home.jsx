import BasicExample from "../components/dropdown";
import BasicNavbar from "../components/navbar";
import HeroSection from "../components/hero";
import CardsSection from "../components/cards";

function Home() {
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

export default Home;
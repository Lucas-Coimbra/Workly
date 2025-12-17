import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Plans from "../components/Plans";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar navigate={navigate} />
      <Hero navigate={navigate} />
      <Features />
      <Plans navigate={navigate} />
      <CTA navigate={navigate} />
      <Footer />
    </div>
  );
}

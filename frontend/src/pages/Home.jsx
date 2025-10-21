import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Plans from "../components/Plans";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home({ onNavigate }) {
  return (
    <div>
      <Navbar onNavigate={onNavigate} />
      <Hero onNavigate={onNavigate} />
      <Features />
      <Plans onNavigate={onNavigate} />
      <CTA onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}

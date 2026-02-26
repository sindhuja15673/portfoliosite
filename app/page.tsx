
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>
      <Navbar />
      <Hero />
      <Gallery />
      <Footer />
    </ProtectedRoute>
  );
}
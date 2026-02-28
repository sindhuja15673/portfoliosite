
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
// import Booking from "./components/Booking";
import TrustSignals from "./components/TrustSignals";
// import ReviewForm from "./components/ReviewForm";
import Contact from "./components/Contact";
import AboutPage from "./components/About";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Gallery />
      <AboutPage/>
      <Pricing />
      <TrustSignals/>
      <Contact/>
      {/* <Booking /> */}
      {/* <ReviewForm /> */}
      <Footer />
    </>
  );
}

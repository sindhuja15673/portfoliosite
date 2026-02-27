
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
// import Booking from "./components/Booking";
import TrustSignals from "./components/TrustSignals";
// import ReviewForm from "./components/ReviewForm";
export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />
      <Pricing />
      <TrustSignals/>
      {/* <Booking /> */}
      {/* <ReviewForm /> */}
      <Footer />
    </>
  );
}
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import Gallery from "./components/Gallery";
// import Footer from "./components/Footer";
// import ProtectedRoute from "./components/ProtectedRoute";

// export default function Home() {
//   return (
//     <ProtectedRoute>
//       <Navbar />
//       <Hero />
//       <Gallery />
//       <Footer />
//     </ProtectedRoute>
//   );
// }
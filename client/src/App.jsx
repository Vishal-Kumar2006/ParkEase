import { Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect, useRef } from "react";
import Lenis from "lenis";
import Navbar from "./components/Body/Navbar.jsx";
import Footer from "./components/Body/Footer.jsx";
import "./App.css";

// Lazy Loading Components for Performance
const Home = lazy(() => import("./components/Parking/Home.jsx"));

// All Parkings Routes
const AllParking = lazy(() => import("./components/Parking/AllParkings.jsx"));
const ElectricParking = lazy(
  () => import("./components/Parking/ElectricParking.jsx"),
);
const ParkingDetails = lazy(() => import("./components/Parking/Parking.jsx"));
const NewParking = lazy(() => import("./components/Parking/NewParking.jsx"));
const UpdateParking = lazy(
  () => import("./components/Parking/UpdateParking.jsx"),
);

// All User Routes
const Profile = lazy(() => import("./components/User/Profile.jsx"));
const SignUp = lazy(() => import("./components/User/SignUp.jsx"));

// All Booking Routes
const Book = lazy(() => import("./components/Booking/Book.jsx"));
const Booking = lazy(() => import("./components/Booking/Booking.jsx"));
const NotFound = lazy(() => import("./components/Body/NotFound.jsx")); // Handle unknown routes

const Spinner = lazy(() => import("../src/components/Body/Spinner.jsx"));

const App = () => {
  const lenisRef = useRef(null);

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;
    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="App">
      <Navbar />

      {/* Suspense to handle lazy loading fallback */}
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* All Parkings Routes */}
          <Route path="/parkings" element={<AllParking />} />
          <Route path="/electricParking" element={<ElectricParking />} />
          <Route path="/parkings/new" element={<NewParking />} />
          <Route path="/parkings/:id" element={<ParkingDetails />} />
          <Route path="/parkings/:id/update" element={<UpdateParking />} />

          {/* All User Routes */}
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/signup" element={<SignUp />} />

          {/* All Booking Routes */}
          <Route path="/booking/:id" element={<Book />} />
          <Route path="/show-booking/:id" element={<Booking />} />

          {/* Catch-All Route for 404 Pages */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;

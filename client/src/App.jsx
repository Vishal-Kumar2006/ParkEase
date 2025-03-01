import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Body/Navbar.jsx";
import Footer from "./components/Body/Footer.jsx";
import "./App.css";

// Lazy Loading Components for Performance
const Home = lazy(() => import("./components/Parking/Home.jsx"));
const AllParking = lazy(() => import("./components/Parking/allParkings.jsx"));
const ElectricParking = lazy(() => import("./components/Parking/ElectricParking.jsx"));
const ParkingDetails = lazy(() => import("./components/Parking/Parking.jsx")); 
const Profile = lazy(() => import("./components/User/Profile.jsx"));
const NotFound = lazy(() => import("./components/Body/NotFound.jsx")); // Handle unknown routes
const NewParking = lazy(()=> import("./components/Parking/NewParking.jsx"));

const App = () => {
  return (
      <div className="App">
        <Navbar />
        
        {/* Suspense to handle lazy loading fallback */}
        <Suspense fallback={<h2>Loading...</h2>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/parkings" element={<AllParking />} />
            <Route path="/electricParking" element={<ElectricParking />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/parkings/new" element={<NewParking />} />
            
            
            {/* Dynamic Route for Individual Parking Details */}
            <Route path="/parkings/:id" element={<ParkingDetails />} />
            
            {/* Catch-All Route for 404 Pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
   
  );
};

export default App;

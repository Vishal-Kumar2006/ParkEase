import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import ParkingSpots from "./components/ParkingSpots";

import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import Login from "./components/Login";

import "./App.css";
import UpdateUser from "./components/UpdateUser";


const App = () => {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/parking-spots" element={<ParkingSpots />} />
                    <Route path="/sign-up" element={<SignUp/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/update-profile" element={<UpdateUser/>} />
                    
                </Routes>
            </main>
            <Footer />
        </Router>
    );
};

export default App;

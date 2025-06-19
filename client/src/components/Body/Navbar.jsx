
import { useState } from "react";
import { NavLink } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from "@mui/icons-material/Menu";  // Hamburger icon
import CloseIcon from "@mui/icons-material/Close";  // Close icon
import { LuCircleParking } from "react-icons/lu";


import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  
  return (
    <header className="Navbar">
      <h3 className="nav-heading">ParkEase</h3>

      {/* Menu Button for Mobile */}
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Navigation Links */}
      <div className={`nav-options ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" className="nav-option"
            onClick={() => setMenuOpen(!menuOpen)}
        >
      
          <HomeIcon /> 
          <p >Home</p>
        </NavLink>

        <NavLink to="/parkings" className="nav-option"
        onClick={() => setMenuOpen(!menuOpen)}
        >
          <DirectionsCarIcon /> 
          <p>All Parkings</p>
        </NavLink>

        <NavLink to="/electricParking" className="nav-option"
        onClick={() => setMenuOpen(!menuOpen)}
        >
          <ElectricCarIcon /> 
          <p>E-Parking</p>
        </NavLink>

        <NavLink to="/parkings/new" className="nav-option"
        onClick={() => setMenuOpen(!menuOpen)}
        >
          <LuCircleParking /> 
          <p>Create New Parking</p>
         
        </NavLink>

        <NavLink to="/user/profile" className="nav-option"
        onClick={() => setMenuOpen(!menuOpen)}
        >
          <AccountBoxIcon /> 
          <p>Profile</p>
        </NavLink>
        
      </div>
    </header>
  );
};

export default Navbar;

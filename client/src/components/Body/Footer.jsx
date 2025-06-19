import { NavLink } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - About */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>ParkEase is your smart parking solution for hassle-free parking.</p>
        </div>

        {/* Middle Section - Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <NavLink to="/parkings" className="footer-link">Parkings</NavLink>
          <NavLink to="/electricParking" className="footer-link">E-Parking</NavLink>
          <NavLink to="/contact" className="footer-link">Contact Us</NavLink>
        </div>

        {/* Right Section - Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>
          <p><PhoneIcon /> +123 456 7890</p>
          <p><EmailIcon /> support@parkease.com</p>
          <p><LocationOnIcon /> New Delhi, India</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FacebookIcon />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon />
        </a>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2024 ParkEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

import { useState } from "react";
import "./footer.css"; // Import the CSS file
import instagram from "./assets/instagram.png"
import whatsapp from "./assets/whatsapp.png"
import logo from "./assets/logo.png"

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Subscribed with:", email);
      setEmail(""); // Clear input after submission
    }
  };

  return (
    <footer className="footer">
      {/* Subscribe Input */}
      <div className="footer-form">
      <p>Subscribe</p>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleSubmit}
        className="subscribe-input"
      />
       </div>
      {/* Logo */}
      <div className="logo-container">
        <img src={logo} alt="Elixir Logo" className="footer-logo" />
      </div>

      {/* Social Media Icons */}
      <div className="social-icons">
        <img src={whatsapp} alt="WhatsApp" className="icon" />
        <img src={instagram} alt="Instagram" className="icon" />
      </div>
    </footer>
  );
}

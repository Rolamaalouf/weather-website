import React, { useState } from "react";
import './contactus.css';

const ContactUs = () => {
   // State to store form input values
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);// You can handle form submission here, e.g., send the data to an API
  };

  return (
    <div className="contactus-page">
    <div className="contactus">
      <div className="contact">
      <div className="getintouch">
      </div>
        <div className="header2">
        <h2 >Get in Touch</h2>
        </div>
        <div className="form">
        <form onSubmit={handleSubmit}>
        <div className="name">
         <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          </div>
          <div className="phone">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Your Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          </div>
          <div className="message">
          <label htmlFor="message">Message</label>
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border rounded h-32"
            required
          ></textarea>
          </div>
          <button className="button1" type="submit" >
          Sip & Send
          </button>
         </form>
        </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="location">
        <h2>Location</h2>
        <div>
        <iframe
      title="Google Maps"
      className="map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13323.88599059025!2d35.68514986866124!3d33.39790779860179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ec69cc4ea1465%3A0xe5a197746f6edd48!2sHasbaiyya!5e0!3m2!1sen!2slb!4v1739619917169!5m2!1sen!2slb"
      width="340"
      height="450"
      style={{ border: "0" }}
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

import React from "react";
import ReactDOM from "react-dom/client";
import LandingPage from "./LandingPage"; // Import LandingPage directly

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LandingPage /> {/* Render LandingPage instead of App */}
  </React.StrictMode>
);
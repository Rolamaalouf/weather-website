import React from "react";

const GoPadel = () => {
  return (
    <section className="go-padel">
      <h2>Go Padel</h2>
      <p>Join our Padel community and enjoy the perfect blend of sports and coffee.</p>
      <button onClick={() => window.location.href="https://example.com/padel"}>
        Learn More
      </button>
      <img src="https://example.com/padel.jpg" alt="Go Padel" />
    </section>
  );
};

export default GoPadel;

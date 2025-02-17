import React, { useEffect, useState } from "react";
import axios from "axios";
import './AboutUs.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutUs = () => {
  const [aboutData, setAboutData] = useState(null);

  useEffect(() => {
    axios.get("https://elixir-repo-3.onrender.com/api/about-us")
      .then(response => {
        console.log("Fetched Data:", response.data);
        setAboutData(response.data);
      })
      .catch(error => {
        console.error("Error fetching About Us data:", error);
      });
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="about-us-container1">
      {aboutData ? (
        <>
          <div className="our-story1">
            <div className="storyimage1">
              <img src={aboutData.ourStory.image} alt="Our Story" />
            </div>
            <div className="storytitle1">
              <h1>{aboutData.ourStory.title}</h1>
              <p>{aboutData.ourStory.content}</p>
            </div>
          </div>

          <div className="thegallery1">
            <h2>{aboutData.gallery.title}</h2>
            <Slider {...sliderSettings} className="gallery-carousel">
              {aboutData.gallery.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`Gallery Image ${index + 1}`} className="carousel-image" />
                </div>
              ))}
            </Slider>
          </div>

          <div className="all11">
            <div className="mission1">
              <section>
                <h2>{aboutData.mission.title}</h2>
                <p>{aboutData.mission.content}</p>
              </section>
              <img src={aboutData.mission.image} alt="Mission" />
            </div>

            <div className="vision1">
              <section>
                <h2>{aboutData.vision.title}</h2>
                <p>{aboutData.vision.content}</p>
              </section>
              <img src={aboutData.vision.image} alt="Vision" />
            </div>

            <div className="gopadel1">
              <section>
                <h2>{aboutData.goPadel.title}</h2>
                <p>{aboutData.goPadel.content}</p>
                <button className="buttonpadel">
                  <a href={aboutData.goPadel.buttonLink} className="go-padel-button">
                    {aboutData.goPadel.buttonText}
                  </a>
                </button>
              </section>
              <img src={aboutData.goPadel.image} alt="Go Padel" />
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AboutUs;
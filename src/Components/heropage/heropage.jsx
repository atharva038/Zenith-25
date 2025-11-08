import React, { useEffect, useRef, useState } from "react";
import "./heropage.css";
// import "./heropage.js";
// import "./heropage.html";
// import "./heropage1.css"
// import Slider from "../Slider/slider";
// import Atropos from "atropos/react";
import Timer from "../timer/timer";
// import zenithLogo from "../../Images/zenith_logo.png";
import Image1 from "../../Images/slider-images/basketball.jpg";
import Image2 from "../../Images/slider-images/Chess.jpg";
import Image3 from "../../Images/slider-images/cricket.jpg";
import Image4 from "../../Images/slider-images/football.jpg";
import Image5 from "../../Images/slider-images/handball.jpg";
import Image6 from "../../Images/slider-images/matsuda.jpg";
import Image7 from "../../Images/slider-images/running.jpg";
import Image8 from "../../Images/slider-images/vollyball.jpg";
import Image9 from "../../Images/slider-images/basketball1.jpg";
import calendar from "../../Images/schedule.png"
const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9];

export default function Heropage() {
  const [angle, setAngle] = useState(0);
  const totalImages = images.length;
  const speed = 0.3;
  const requestRef = useRef();

  useEffect(() => {
    const rotate = () => {
      setAngle((prev) => prev - speed);
      requestRef.current = requestAnimationFrame(rotate);
    };

    requestRef.current = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="heropage-main-div">
      <div className="carousel-container">
        <div className="carousel" style={{ transform: `rotateY(${angle}deg)` }}>
          {images.map((src, index) => (
            <div
              key={index}
              className="carousel-item"
              style={{
                transform: `rotateY(${index * (360 / totalImages)
                  }deg) translateZ(400px)`,
              }}
            >
              <img src={src} alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* <Atropos>
        <img
          // data-atropos-offset="-8"
          // id="player"
          // src="https://res.cloudinary.com/dqki29mbg/image/upload/v1707291433/Zenith-24/d9ksa7t1vfabnekcm4yj.png"
          // alt="player"
        ></img>
        <img
          // data-atropos-offset="20"
          // id="ball"
          // src="https://res.cloudinary.com/dqki29mbg/image/upload/v1707291431/Zenith-24/hgmvpkfuisyqzzsprgo3.png"
          // alt="ball"
          // className="balls"
        ></img>
      </Atropos> */}
      <div className="dates">
        <div className="countdown">
          <Timer date="February 23 2024" />
        </div>
        
        <div>
        <div className="event-dates">
          <img src={calendar} className="calendar" alt="" />
          <div className="calendarDate">
          <h3>From Date</h3>
          <h2>28 feb 2026 </h2>
          </div>
          <div className="line">|</div>
          <div className="calendarDate" style={{marginLeft: "10px"}}>
          <h3>To Date</h3>
          <h2>02 Mar 2026 </h2>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

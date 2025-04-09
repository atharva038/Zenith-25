// import React from "react";
// import "./icons.css";

// export default function Icon() {
//   return (
//     <div className="icons">
//       <div className="icons-list youtube">
//         <img
//           src="https://res.cloudinary.com/dqki29mbg/image/upload/v1708276240/Zenith-24/suevvgq3qeg4mbj6nrg0.png"
//           className="image"
//         />
//         <h1>16 Sports</h1>
//         <p>Over 16 sports and games</p>
//       </div>
//       <div className="icons-list calender">
//         <img
//           src="https://res.cloudinary.com/dqki29mbg/image/upload/v1708276241/Zenith-24/duj11r2akxkajy4cudn6.png"
//           className="image"
//         />
//         <h1>10 Years</h1>
//         <p>10 years of successfull execution</p>
//       </div>
//       <div className="icons-list badge">
//         <img
//           src="https://res.cloudinary.com/dqki29mbg/image/upload/v1708276241/Zenith-24/jn0kzkeptkkhjemlzryp.png"
//           className="image"
//         />
//         <h1>4Lakh + Prize</h1>
//         <p>Prize worth up to 4Lakh</p>
//       </div>
//     </div>
//   );
// }


import React from "react";
import "./icons.css";

export default function Icon() {
  return (
    <div className="icons">
      <a
        href="https://www.youtube.com/@zenithsportseventsggsietna7666" 
        target="_blank"
        rel="noopener noreferrer"
        className="icons-list youtube"
      >
        <img
          src="https://res.cloudinary.com/dqki29mbg/image/upload/v1708276240/Zenith-24/suevvgq3qeg4mbj6nrg0.png"
          className="image"
        />
        <h1>14 Sports</h1>
        <p>Over 14 sports and games</p>
      </a>
      <div className="icons-list calender">
        <img
          src="https://res.cloudinary.com/dqki29mbg/image/upload/v1708276241/Zenith-24/duj11r2akxkajy4cudn6.png"
          className="image"
        />
        <h1>10 Years</h1>
        <p>10 years of successful execution</p>
      </div>
      <div className="icons-list badge">
        <img
          src="https://res.cloudinary.com/dqki29mbg/image/upload/v1708276241/Zenith-24/jn0kzkeptkkhjemlzryp.png"
          className="image"
        />
        <h1>3.5 Lakh + Prize</h1>
        <p>Prize worth up to 3.5 Lakh</p>
      </div>
    </div>
  );
}

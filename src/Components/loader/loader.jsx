// import React from "react";
// import "./loader.css";
// import { useEffect } from "react";
// import basketball from "../../Images/basketball.png";
// import tennisball from "../../Images/tennis ball.png";
// import football from "../../Images/football.png";

// export default function Loader() {
//   const spinner = document.getElementById("spinner");

//   useEffect(() => {
//     function changeImage() {
//       setTimeout(function () {
//         document.getElementById("ballImage").src =
//           "../../Images/basketball.png";
//         setTimeout(function () {
//           document.getElementById("ballImage").src =
//             "../../Images/basketball.png";
//         }, 1000);
//       }, 1000);
//     }
//     changeImage();
//   }, [spinner]);

//   return (
//     <div id="spinner">
//       <div class="loader">
//         <img
//           id="ballImage"
//           src="../../Images/basketball.png"
//           alt="basketball_logo"
//         />
//       </div>
//     </div>
//   );
// }


//react 

import React from "react";
import "./loader.css";
// import BounceLoader from "./BounceLoader";

const loader = () => {
  return (
    <div className="loader-container">
      <div className="bounce-loader">
        <div className="balls-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="ball"></div>
          ))}
        </div>
        <div className="shadows-container">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="shadow"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default loader;

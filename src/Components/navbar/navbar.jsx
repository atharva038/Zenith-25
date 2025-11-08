// import React, { useState } from "react";
// import "./navbar.css";
// import menu from "../../Images/menu.png";
// import close from "../../Images/closeMenu.png";
// import logo from "../../Images/logo.png";
// import pdf from "../Event/Zenith.pdf";

// export default function Navbar() {
//   const [c, setC] = useState(0);
//   const [imgSrc, setImgSrc] = useState(
//     "https://res.cloudinary.com/ddaxlm9yc/image/upload/v1707415323/qwci9r7kssikt8oc2o2w.png"
//   );

//   function download(pdfpath) {
//     const pdfUrl = pdfpath;
//     const link = document.createElement("a");
//     link.href = pdfUrl;
//     link.download = "download";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   }

//   const handleMenu = () => {
//     if (c === 0) {
//       document.getElementById("menu-ul").style.display = "flex";
//       setImgSrc(menu);
//       setC(1);
//     } else {
//       document.getElementById("menu-ul").style.display = "none";
//       setImgSrc(close);
//       setC(0);
//     }
//   };

//   return (
//     <div className="navbar-main-div">
//       <div className="logo-black-div">
//         <div className="logo-black-inner-div">
//           <img
//             src="https://res.cloudinary.com/dqki29mbg/image/upload/v1707291527/Zenith-24/rezgbpiqvujpjowazump.png"
//             alt="logo"
//             className="logoss"
//           />
//         </div>
//       </div>
//       <div className="navbar-inner-div">
//         <ul id="menu-ul">
//           <li>
//             <a href="/">HOME</a>
//           </li>
//           <li>
//             <a href="/events">EVENTS</a>
//           </li>
//           {/* <li>
//             <a href="/">OUR TEAM</a>
//           </li> */}

//           <a
//             className="middle2"
//             href="https://docs.google.com/forms/d/e/1FAIpQLSc39wxDFY77MTAe3_nsqOXK1CB-zP7bWjWOBXJNEWkwmVXbqw/viewform"
//           >
//             Register
//           </a>

//           <a className="middle2" onClick={() => download(pdf)}>
//             Brochure
//           </a>
//         </ul>
//         <img
//           src="https://res.cloudinary.com/ddaxlm9yc/image/upload/v1707415322/xccapucfk09qn2idc1en.png"
//           alt="logo"
//           className="hamb"
//           onClick={handleMenu}
//         />
//       </div>
//     </div>
//   );
// }

import React, {useState} from "react";
import "./navbar.css";
import logo_No_Back from "../../Images/logo_No_Back.png";
import pdf from "../Event/Zenith.pdf";
import {Link} from "react-router-dom";

export default function Navbar({activePage}) {
  const [c, setC] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  function download(pdfpath) {
    const pdfUrl = pdfpath;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className="navbar-main-div">
      <div className="logo-black-div">
        <div className="logo-black-inner-div">
          <img src={logo_No_Back} alt="logo" className="logoss" />
        </div>
      </div>
      <div className="navbar-inner-div">
        <ul id="menu-ul" className={`ppp ${menuOpen ? "menu-open" : ""}`}>
          {/* <li>
            <a href="/">HOME</a>
          </li>
          <li>
            <a href="/events">EVENTS</a>
          </li> */}
          <li>
            <Link to="/" className={activePage === "home" ? "active" : ""}>
              HOME
            </Link>
          </li>
          <li>
            <Link
              to="/events"
              className={activePage === "events" ? "active" : ""}
            >
              EVENTS
            </Link>
          </li>
          <li>
            <Link
              to="/glimpse"
              className={activePage === "glimpses" ? "active" : ""}
            >
              GLIMPSES
            </Link>
          </li>
          {/* <li>
            <a href="/">OUR TEAM</a>
          </li> */}

          {/* <a
            href="https://forms.gle/LRbsX9pw59sUtLJh6"
            className="middle2"
            target="_blank"
          >
            Register{" "}
          </a> */}

          <Link to="/registration" className="middle2">
            Register{" "}
          </Link>

          <button className="middle3" onClick={() => download(pdf)}>
            Brochure
          </button>
        </ul>

        {/* Hamburger Menu Toggle Button */}
        <button className="hamb" onClick={handleMenu} aria-label="Toggle menu">
          {menuOpen ? (
            // Close Icon (X)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            // Hamburger Icon (Three Lines)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>

        {/* Backdrop Overlay */}
        {menuOpen && <div className="menu-backdrop" onClick={handleMenu} />}
      </div>
    </div>
  );
}

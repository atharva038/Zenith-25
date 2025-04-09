import React from "react";
import Heropage from "../heropage/heropage";
import About from "../about/about";
import Navbar from "../navbar/navbar.jsx";
import Mentor from "../MentorsPage/mentor.js";
import Footer from "../footer2/footer2.jsx";
import Icon from "../Icon/icons.jsx";
import Guest from "../guest/guest.jsx";

export default function Homepage() {
  return (
    <div>
      
      <Navbar />
      <Heropage />
      <Icon />
      <About />
      <Guest />
      <Mentor />
      <Footer />
      
    </div>
  );
}




// Slider folder: slider.jsx file

// import React, { useEffect, useRef } from "react";

// const data = [
//   {
//     common: "Lion",
//     binomial: "Panthera leo",
//     photo: {
//       code: "1583499871880-de841d1ace2a",
//       page: "lion-lying-on-brown-rock-MUeeyzsjiY8",
//       text: "lion couple kissing on a brown rock",
//       pos: "47% 35%",
//       by: "Clément Roy",
//     },
//   },
//   {
//     common: "Asiatic elephant",
//     binomial: "Elephas maximus",
//     photo: {
//       code: "1571406761758-9a3eed5338ef",
//       page: "shallow-focus-photo-of-black-elephants-hZhhVLLKJQ4",
//       text: "herd of Sri Lankan elephants walking away from a river",
//       pos: "75% 65%",
//       by: "Alex Azabache",
//     },
//   },
// ];

// const Slider = () => {
//   const galleryRef = useRef(null);

//   useEffect(() => {
//     const f = (k) => {
//       if (Math.abs(k) > 0.5) {
//         window.scrollTo(
//           0,
//           0.5 * (k - Math.sign(k) + 1) * (document.documentElement.offsetHeight - window.innerHeight)
//         );
//       }
//     };
//     f(-1);
    
//     const handleScroll = () => {
//       f(+getComputedStyle(document.body).getPropertyValue("--k"));
//     };
    
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div className="scene">
//       <header>
//         <h1>Infinite Scroll Circular Gallery</h1>
//         <strong>Scroll up & down / Use up & down arrow keys</strong>
//         <em>Mostly CSS scroll-driven animations + a tiny bit of JS</em>
//       </header>
      
//       <main className="assembly" ref={galleryRef}>
//         {data.map((c, i) => {
//           let img = c.photo;
//           let url = `https://images.unsplash.com/photo-${img.code}?h=900`;

//           return (
//             <article key={i} style={{ backgroundImage: `url(${url})`, backgroundPosition: img.pos }}>
//               <header>
//                 <h2>{c.common}</h2>
//                 <em>{c.binomial}</em>
//               </header>
//               <figure>
//                 <img src={url} alt={img.text} />
//                 <figcaption>
//                   by <a href={`https://unsplash.com/photos/${img.page}`} target="_blank" rel="noopener noreferrer">{img.by}</a>
//                 </figcaption>
//               </figure>
//             </article>
//           );
//         })}
//       </main>
//     </div>
//   );
// };

// export default Slider;


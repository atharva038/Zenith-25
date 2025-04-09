import React, { useState, useEffect } from "react";
import styles from  "./Event.module.css";
import Model from "./Model";
import pdf from "./Zenith.pdf";
import Navbar from "../navbar/navbar.jsx";
import Footer from "../footer2/footer2.jsx";

const sportsData = [
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415831/Event-Page/dhz3zwc6ebpiytudgmpr.png",
    name: "Cricket",
    boys: "Boys : 6500₹",
    // girls: "Girls : 1200₹",
    contact1: "Om Dhande: - 7499065743 ",
    contact2: "Shiv Amdurkar: 8055867030",
  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415833/Event-Page/xcul6wzqejyuxxh4bjgu.png",
    name: "Football",
    boys: "Boys : 3000₹",
    // girls: "Girls : 1200₹",
    // contact: "Sainath Shettiwar: 9604875754 , Devanshu kothe : 9130707352",
    contact1: "Pratik Nandekar : 8766788489",
    contact2: "Devanshu kothe : 9130707352",
  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415833/Event-Page/xcul6wzqejyuxxh4bjgu.png",
    name: "RingFootball",
    boys: "Boys : 2200₹",
    girls: "Girls : 1500₹",
    // contact: "Abhishek avhad: 8329896467 , Fazlur Rahman : 8767221998",
    contact1: "Meher Singh Bal: 8087926615",
    contact2: "Onkar Sahane : 8767192671",
    contact3: "Vranda Baheti: 7058638665"
  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415829/Event-Page/jcqmiwan90zxdjqepfax.png",
    name: "Chess",
    // boys: "Team : 1500₹",
    boys: "Solo : 200₹",
    // contact: "Vaishnavi paul : 90114 69945 , Aditya chincholkar : 7385041646",
    contact1: "Atharva Joshi : 9156906881",
    contact2: "Vaishanavi Paul  : 9011469945",
    contact3: "Uday Borde  : 8380997422",

  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415835/Event-Page/fhvd0hjerpv8pmlbkhse.png",
    name: "Volleyball",
    boys: "Boys : 2200₹",
    girls : "Girls : 1500₹",
    //contact: "Ayush Gahukar: 7666693350 , Pranay Rathod: 8767410458",
    contact1: "Ayush Gahukar: 7666693350",
    contact2: "Pranay Rathod: 8767410458",
    contact3: "Tanvi Aswale : 8767014512",
  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415829/Event-Page/wapi2dnoivdrd4e3cofq.png",
    name: "Kabaddi",
    boys: "Boys : 2200₹",
    girls: "Girls : 1500₹",
    //  contact: "Sushant Pradhan: 8836025310 , Nikul Jadhao : 8836025310",
    contact1: "Manish Chaudhary : 9370377479",
    contact2: "Pratik Ghurde : 9730161120",
    contact3: "Chetan Bante : 8263945881",

  },
  {
    image:
      "https://res.cloudinary.com/ddaxlm9yc/image/upload/v1707434615/ftfsvqgu2y026vsbt1ui.png",
    name: "Kho-Kho",
    boys: "Boys : 1500₹",
    // girls: "Girls : 1200₹",
    //  contact: "Sushant Pradhan: 8836025310 , Nikul Jadhao : 8836025310",
    contact1: "Gaurav Nayase: 7249849725",
    contact2: "Dipanshu Sahatpure: 7620666188",
  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415834/Event-Page/dsxvtc0pgyta5mpyprkt.png",
    name: "Handball",
    boys: "Boys : 1500₹",
    //girls: "Girls : 1200₹",
    //contact: "Aniket Dharwar: 96733 52236 , Udedhan Sonawane : 8888964392",
    contact1: "Sainath Gaikwad : 9158230463",
    contact2: "Aditya Joshi : 7820939780",
  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415833/Event-Page/apa36dxqwxmevwkgl5hl.png",
    name: "Basketball",
    boys: "Boys : 2500₹",
    girls: "Girls : 1500₹",
    // contact: "Dishant Sawwalakhe: 9699120082 , Shakib : 9960844980",
    contact1: "Umakant Rokade: 8055119860",
    contact2: "Uday Naukarkar : 9322684201",
  },
  {
    image:
      "https://res.cloudinary.com/diztvedtn/image/upload/v1739552554/njcm5rownwkj3xqbsn1y.jpg",
    name: "Badminton",
    boys: "Boys : 500₹",
    girls: "Girls : 400₹",
    // boys : "Team : 1500₹",
    // contact: "Dishant Sawwalakhe: 9699120082 , Shakib : 9960844980",
    contact1: "Nawaz Khan : 9922320080",
    contact2: "Atharva Supe : 9975902023",
  },
  {
    image:
      "https://res.cloudinary.com/diztvedtn/image/upload/v1739552958/thci3xcrpwy2c5gpkjwy.jpg",
    name: "Athletics",
    boys: "team : 700",
    Single : "Individual : 200",
    //singles: "singles : 400₹",
    // contact: "Dishant Sawwalakhe: 9699120082 , Shakib : 9960844980",
    contact1: "Lavkesh Dhruve : 8275896149",
  },
  {
    image:
      "https://res.cloudinary.com/dqki29mbg/image/upload/v1707415833/Event-Page/apa36dxqwxmevwkgl5hl.png",
    name: "Basketball 3X3",
    boys: "Boys : 500₹",
    // contact: "Dishant Sawwalakhe: 9699120082 , Shakib : 9960844980",
    contact1: "Harsh Banpurkar: 7083998135",
    contact2: "Jay Gawande : 9765489609",
  },

  {
    image:
      "https://res.cloudinary.com/diztvedtn/image/upload/v1739553052/jrl6g8hdf9eptoses0c6.jpg",
    name: "Tug Of War",
    boys: "Team : 1000₹",
    // contact: "Dishant Sawwalakhe: 9699120082 , Shakib : 9960844980",
    contact1: "Shivprasad Kadam: 9096293607",
  },

  {
    image:
      "https://res.cloudinary.com/diztvedtn/image/upload/v1739705915/dc9h5hwjuwyevx998bri.jpg",
    name: "Power Lifting",
    boys: "Single : 250₹",
    // contact: "Dishant Sawwalakhe: 9699120082 , Shakib : 9960844980",
    contact1: "Tejas Borole: 8767386695",
    contact2: "Jayesh Padghan : 8805314194", 
  },
  
];

const Event = () => {
  const [Pop, setPop] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);

  const handleViewMore = (sport) => {
    setSelectedSport(sport);
    setPop(true);
  };

  function download(pdfpath) {
    const pdfUrl = pdfpath;
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "download";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={Pop ? styles.blurBackground : ""}></div>
        <div className={styles.heading}>
          <h1>Events</h1>
        </div>
        <div className={styles.wrapper}>
          {sportsData.map((sport, index) => (
            <div className={styles.card1} key={index}>
              <div className={styles.img}>
                <img src={sport.image} alt="" />
              </div>
              <h2>{sport.name}</h2>
              <div className={styles.info}>
                <h2>{sport.name}</h2>
                <p className={styles.fees}>Entry Fee </p>
                <div className={styles.price}>
                  <p>
                    {sport.boys}
                    <br />
                    {sport.girls}
        
                  </p>
                  <p>
                  {sport.double}
                    <br/>
                    {sport.single}
                  </p>
                  <p>
                  {sport.solo}             
                  </p>
                  
            

                </div>
                <div className={styles.btns}>
                  <button className={styles.btn} onClick={() => handleViewMore(sport)}>
                    View More
                  </button>
                  <button
                    id="downloadBtn"
                    value="download"
                    className={styles.download}
                    onClick={() => download(pdf)}
                  >
                    <img
                      src="https://res.cloudinary.com/dqki29mbg/image/upload/v1707415831/Event-Page/bsomh2xhrbiuz6jpe9ah.png"
                      alt="Download"
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className={styles.pop}>
            {Pop && (
              <Model sport={selectedSport} onClose={() => setPop(false)} />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Event;

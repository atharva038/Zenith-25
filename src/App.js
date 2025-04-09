// import logo from "./logo.svg";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import Homepage from "./Components/homepage/homepage";
import Event from "./Components/Event/Event.jsx";
import Glimpse from "./Components/Glimpse/Glimpse.jsx";
import Background from "./Components/background/background.js";
import RegistrationForm from "../src/Components/Forms/RegistrationForm/RegistrationForm.jsx"
import loader from "./Components/loader/loader.jsx";

function App() {
  return (
    <div className="App">
      <div className="background-wrapper">
        <Background />
      </div>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/events" element={<Event />}/>
        <Route path = "/glimpse" element={<Glimpse/>} />
        <Route path = "/registration" element={<RegistrationForm/>} />
        <Route/>
        
      </Routes>
      {/* <Event /> */}
      {/* <Mentor />
      <Footer2 /> */}
      {/* <Footer /> */}
      {/* <Event /> */}
    </div>
  );
}

export default App;




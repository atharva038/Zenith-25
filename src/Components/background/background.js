import React from "react";
import "./background.css";

const Background  =() => {
  return (
    <div className="background">
      {[...Array(5)].map((_, i) => (
        <div className="cube" key={i}></div>
      ))}
    </div>
  );
}

export default Background;
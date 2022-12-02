import React from "react";
import "./MainSection.css";


function MainSection() {
  return (
    <div className="main-container">
      <div className="rec-medium">
        <div className="line"></div>
      </div>
      <div className="small-rec-container">
        <div className="rec-small"></div>
        <div className="rec-small"></div>
        <div className="rec-mini-half-left"></div>
        <div className="rec-mini-half-right"></div>
        <div className="rec-mini"></div>
      </div>
      <div className="large-rec-container">
        <div className="rec-large"></div>
        <div className="rec-large"></div>
        <div className="rec-large"></div>
        <div className="rec-large"></div>
      </div>
    </div>
  );
}

export default MainSection;

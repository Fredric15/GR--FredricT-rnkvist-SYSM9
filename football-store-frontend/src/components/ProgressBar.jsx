import React from "react";
import "./ProgressBar.css";

export default function ProgressBar({ currentStep }) {
  return (
    <div className="progress-bar">
      {/* Steg 1: Varukorg */}
      <div
        className={`progress-bar__step ${currentStep >= 1 ? "progress-bar__step--active" : ""}`}
      >
        <div className="progress-bar__circle">1</div>
        <span>Varukorg</span>
      </div>

      <div className="progress-bar__line"></div>

      {/* Steg 2: Kassa */}
      <div
        className={`progress-bar__step ${currentStep >= 2 ? "progress-bar__step--active" : ""}`}
      >
        <div className="progress-bar__circle">2</div>
        <span>Kassa</span>
      </div>

      <div className="progress-bar__line"></div>

      {/* Steg 3: Klart */}
      <div
        className={`progress-bar__step ${currentStep >= 3 ? "progress-bar__step--active" : ""}`}
      >
        <div className="progress-bar__circle">3</div>
        <span>Klart</span>
      </div>
    </div>
  );
}

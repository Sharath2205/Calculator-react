import React, { useState } from "react";

import Header from "./Components/Header/Header";

import moon from "./assets/moon.png";
import sun from "./assets/sun.png";

import "./app.css";
import Keypad from "./Components/Keypad/Keypad";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="app" data-theme={isDarkMode ? "dark" : ''}>
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div className="app_calculator_navbar_toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div className={`app_calculator_navbar_toggle_circle ${isDarkMode ? "app_calculator_navbar_toggle_circle_active" : ""}`} />
          </div>
          <img src={isDarkMode ? moon : sun} alt="mode" />
        </div>
      <Header /> 
      <Keypad />
      </div>
    </div>
  );
}

export default App;

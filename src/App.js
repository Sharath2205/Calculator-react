import React, { useEffect, useState } from "react";

import Header from "./Components/Header/Header";

import moon from "./assets/moon.png";
import sun from "./assets/sun.png";

import "./app.css";
import Keypad from "./Components/Keypad/Keypad";

const usedKeyCodes = [
  48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103,
  104, 105, 8, 13, 190, 187, 189, 191, 56, 111, 106, 107, 109,
];
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const operators = ["-", "+", "*", "/"];

function App() {
  const [isDarkMode, setIsDarkMode] = useState(JSON.parse(localStorage.getItem("app-mode")) || false);
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem("app-history")) || []);

  const calculateResult = (exp) => {
    if(!exp) {
      setResult('');
      return;
    }
    const lastChar = exp.slice(-1);
    if(!numbers.includes(lastChar)) exp = exp.slice(0, -1);

    const answer = eval(exp).toFixed(2);
    setResult(answer);
    console.log(answer);
  }

  const handleKeyPress = (keyCode, key) => {
    if(!keyCode) return;
    if(!usedKeyCodes.includes(keyCode)) return;

    if(numbers.includes(key)) {
      if (key === "0") {
        if (expression.length === 0) return;
      }
      calculateResult(expression + key);
      setExpression(expression + key);
      console.log("number");
    } else if (operators.includes(key)) {
      if (!expression) return;
      
      const lastChar = expression.slice(-1);
      if(operators.includes(lastChar)) return;
      if(lastChar === '.') return;

      setExpression(expression + key);
      console.log("operator");
    } else if (key === '.') {
      
      if (!expression) return;
      const lastChar = expression.slice(-1);
      if (!numbers.includes(lastChar)) return;

      setExpression(expression + key);
    }else if (keyCode === 8) { // backSpace
      if(!expression) {
        return;
      }
      if(expression.length === 0) {
        setResult("");
        return;
      }
      setExpression(expression.slice(0, -1))
      calculateResult(expression.slice(0, -1));
    } else if (keyCode === 13) {  // enter
      if(!expression) return;
      calculateResult(expression);

      const prevHistory = [...history];
      if(history.length > 20) prevHistory.splice(0, 1);
      prevHistory.push(expression);
      setHistory(prevHistory);
      setExpression('');
    }

  }

  useEffect(() => {
    localStorage.setItem("app-mode", JSON.stringify(isDarkMode));
    console.log("test", isDarkMode);
  }, [isDarkMode])

  useEffect(() => {
    localStorage.setItem("app-history", JSON.stringify(history))
  }, [history])

  return (
    <div className="app"
    tabIndex={0}
    onKeyDown={(e) => handleKeyPress(e.keyCode, e.key)}
    data-theme={isDarkMode ? "dark" : ''}>
      <div className="app_calculator">
        <div className="app_calculator_navbar">
          <div className="app_calculator_navbar_toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            <div className={`app_calculator_navbar_toggle_circle ${isDarkMode ? "app_calculator_navbar_toggle_circle_active" : ""}`} />
          </div>
          <img src={isDarkMode ? moon : sun} alt="mode" />
        </div>
      <Header expression = { expression } result = { result } history = { history }/> 
      <Keypad handleKeyPress = {handleKeyPress}/>
      </div>
    </div>
  );
}

export default App;

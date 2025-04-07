import React from "react";
import BMICalculator from "./components/BMICalculator";
import "./styles/index.css";

function App() {
  return (
    <div className="app">
      <main className="min-h-screen flex items-center justify-center p-4 bg-black">
        <BMICalculator />
      </main>
    </div>
  );
}

export default App;

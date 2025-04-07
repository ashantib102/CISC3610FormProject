import React, { useState, useEffect } from "react";
import "../styles/BMICalculator.css";
// Import UI components
import Card from "./UI/Card";
import Input from "./UI/Input";
import Label from "./UI/Label";
import RadioGroup from "./UI/RadioGroup";

function BMICalculator() {
  const [unit, setUnit] = useState("metric");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryColor, setCategoryColor] = useState("bg-gray-700");

  // BMI calculation logic
  const calculateBMI = () => {
    if (!weight || !height) return 0;

    let bmiValue = 0;
    if (unit === "metric") {
      // Weight in kg, height in cm
      const heightInMeters = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInMeters * heightInMeters);
    } else {
      // Weight in lbs, height in inches
      bmiValue =
        (parseFloat(weight) * 703) / (parseFloat(height) * parseFloat(height));
    }

    return parseFloat(bmiValue.toFixed(1));
  };

  // Category determination logic
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) return { category: "Underweight", color: "blue-500" };
    if (bmi < 25) return { category: "Normal weight", color: "green-500" };
    if (bmi < 30) return { category: "Overweight", color: "yellow-500" };
    if (bmi < 35) return { category: "Obesity Class I", color: "orange-500" };
    if (bmi < 40) return { category: "Obesity Class II", color: "red-500" };
    return { category: "Obesity Class III", color: "red-600" };
  };

  // Update BMI when inputs change
  useEffect(() => {
    if (weight && height) {
      const calculatedBMI = calculateBMI();
      setBmi(calculatedBMI);
      const { category, color } = getBMICategory(calculatedBMI);
      setCategory(category);
      setCategoryColor(color);
    } else {
      setBmi(0);
      setCategory("");
      setCategoryColor("gray-700");
    }
  }, [weight, height, unit]);

  return (
    <div className="bmi-calculator">
      {/* BMI Calculator UI */}
      {/* ... (implementation details) */}
    </div>
  );
}

export default BMICalculator;

// DOM Elements
const unitRadios = document.querySelectorAll('input[name="unit"]');
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const weightUnitSpan = document.getElementById("weight-unit");
const heightUnitSpan = document.getElementById("height-unit");
const bmiValueElement = document.getElementById("bmi-value");
const bmiCategoryElement = document.getElementById("bmi-category");
const gaugeFill = document.getElementById("gauge-fill");

// Initialize
updateUnitLabels();

// Event Listeners
unitRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    updateUnitLabels();
    calculateBMI();
  });
});

weightInput.addEventListener("input", calculateBMI);
heightInput.addEventListener("input", calculateBMI);

// Functions
function updateUnitLabels() {
  const unit = document.querySelector('input[name="unit"]:checked').value;

  if (unit === "metric") {
    weightUnitSpan.textContent = "kg";
    heightUnitSpan.textContent = "cm";
  } else {
    weightUnitSpan.textContent = "lb";
    heightUnitSpan.textContent = "in";
  }
}

function calculateBMI() {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  const unit = document.querySelector('input[name="unit"]:checked').value;

  // Clear results if inputs are empty
  if (!weight || !height) {
    resetResults();
    return;
  }

  let bmi;
  if (unit === "metric") {
    // Weight in kg, height in cm
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    // Weight in lb, height in inches
    bmi = (weight * 703) / (height * height);
  }

  // Round to 1 decimal place
  bmi = Math.round(bmi * 10) / 10;

  updateResults(bmi);
}

function resetResults() {
  bmiValueElement.textContent = "0";
  bmiCategoryElement.textContent = "Enter your height and weight";
  bmiCategoryElement.className = "category-value";
  gaugeFill.style.height = "0";
  gaugeFill.className = "gauge-fill";
}

function updateResults(bmi) {
  // Update BMI value
  bmiValueElement.textContent = bmi;

  // Update gauge fill
  const fillPercentage = Math.min(100, (bmi / 40) * 100);
  gaugeFill.style.height = `${fillPercentage}%`;

  // Determine category and colors
  let category, textColorClass, fillColorClass;

  if (bmi < 18.5) {
    category = "Underweight";
    textColorClass = "text-blue";
    fillColorClass = "bg-blue-fill";
  } else if (bmi < 25) {
    category = "Normal weight";
    textColorClass = "text-green";
    fillColorClass = "bg-green-fill";
  } else if (bmi < 30) {
    category = "Overweight";
    textColorClass = "text-yellow";
    fillColorClass = "bg-yellow-fill";
  } else if (bmi < 35) {
    category = "Obesity Class I";
    textColorClass = "text-orange";
    fillColorClass = "bg-orange-fill";
  } else if (bmi < 40) {
    category = "Obesity Class II";
    textColorClass = "text-red";
    fillColorClass = "bg-red-fill";
  } else {
    category = "Obesity Class III";
    textColorClass = "text-dark-red";
    fillColorClass = "bg-dark-red-fill";
  }

  // Update category text and colors
  bmiCategoryElement.textContent = category;
  bmiCategoryElement.className = `category-value ${textColorClass}`;
  gaugeFill.className = `gauge-fill ${fillColorClass}`;
}

/**
 * @param height in cm
 * @param weight in kg
 */
export const calculateBmi = (height: number, weight: number): string => {
  const heigthMeters = height / 100;
  const bmi = weight / (heigthMeters * heigthMeters);

  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi >= 18.5 && bmi < 25) {
    return "Normal weight";
  } else if (bmi >= 25 && bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
}

if (require.main === module) {
  if (process.argv.length !== 4) {
    console.log("Arguments must be in the format: <height> <weight>");
    process.exit(1);
  }

  const height = Number(process.argv[2]);
  const weight = Number(process.argv[3]);
  if (isNaN(height) || isNaN(weight)) {
    console.log("Arguments must be numbers");
    process.exit(1);
  }

  console.log(calculateBmi(height, weight));
}



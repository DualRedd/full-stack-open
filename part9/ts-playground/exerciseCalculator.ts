interface ExerciseEvaluation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (daily_exercises: number[], target: number): ExerciseEvaluation => {
  const average = daily_exercises.reduce((a, b) => a + b, 0) / daily_exercises.length;
  let rating = 1;
  let ratingDescription = "bad, you should try to do more exercises";
  if (average >= target) {
    rating = 3;
    ratingDescription = "great, you hit your target";
  } else if (average >= target * 0.8) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  }

  return {
    periodLength: daily_exercises.length,
    trainingDays: daily_exercises.filter(day => day > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  }
}

if (require.main === module) {
  if (process.argv.length !== 4) {
    console.log("Arguments must be in the format: <daily_exercises> <target>");
    process.exit(1);
  }

  const daily_exercises = process.argv[2].split(",").map(Number);
  const target = Number(process.argv[3]);

  if (daily_exercises.some(isNaN)) {
    console.log("daily_exercises must be numbers separated by commas");
    process.exit(1);
  }

  if (isNaN(target)) {
    console.log("target must be a number");
    process.exit(1);
  }

  console.log(calculateExercises(daily_exercises, target))
}

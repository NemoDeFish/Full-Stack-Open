import { isNotNumber } from "./utils";

interface ResultValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CalculateValues {
  dailyHrs: number[];
  targetHrs: number;
}

// Do not have to put these in functions
const parseArguments = (args: string[]): CalculateValues => {
  if (args.length < 12) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");

  const dailyHrs: number[] = [];
  // Alternative Solution: Slice first
  // const argDays = args.slice(3);
  // Then use a cleaner for loop:
  // for (const dayArg of argDays)
  for (let i = 3; i < args.length; i++) {
    // You can check the args[2] separately
    if (!isNotNumber(args[i]) && !isNotNumber(args[2])) {
      // Alternatively, map the arguments
      dailyHrs.push(Number(args[i]));
    } else {
      throw new Error("Provided values were not numbers!");
    }
  }

  return {
    dailyHrs,
    targetHrs: Number(args[2]),
  };
};

// Should be inside utils.ts
// So that the code can be used separately
// for command-line arguments in Exercise 9.3
// and for endpoints in Exercise 9.5
export const calculateExercises = (
  dailyHrs: number[],
  targetHrs: number
): ResultValues => {
  const periodLength = dailyHrs.length;
  const trainingDays = dailyHrs.filter((hour) => hour > 0).length;
  const target = targetHrs;
  // dailyHrs.length => periodLength
  const average =
    dailyHrs.reduce((sumHrs, dailyHr) => sumHrs + dailyHr, 0) / dailyHrs.length;
  // >=
  const success = average > target;

  // Separate this into a separate function 'calculateRating'
  let rating;
  const metric = average / target;
  if (metric >= 1) rating = 3;
  else if (metric >= 0.5) rating = 2;
  else rating = 1;

  // Use an object with numbers as keys & description as values
  let ratingDescription: string = "";
  switch (rating) {
    case 1:
      ratingDescription = "bad";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    case 3:
      ratingDescription = "good";
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHrs, targetHrs } = parseArguments(process.argv);
  console.log(calculateExercises(dailyHrs, targetHrs));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

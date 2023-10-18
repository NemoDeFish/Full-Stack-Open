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

const parseArguments = (args: string[]): CalculateValues => {
  if (args.length < 12) throw new Error("Not enough arguments");
  if (args.length > 12) throw new Error("Too many arguments");

  const dailyHrs: number[] = [];
  for (let i = 3; i < args.length; i++) {
    if (!isNotNumber(args[i]) && !isNotNumber(args[2])) {
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

export const calculateExercises = (
  dailyHrs: number[],
  targetHrs: number
): ResultValues => {
  const periodLength = dailyHrs.length;
  const trainingDays = dailyHrs.filter((hour) => hour > 0).length;
  const target = targetHrs;
  const average =
    dailyHrs.reduce((sumHrs, dailyHr) => sumHrs + dailyHr, 0) / dailyHrs.length;
  const success = average > target;

  let rating;
  const metric = average / target;
  if (metric >= 1) rating = 3;
  else if (metric >= 0.5) rating = 2;
  else rating = 1;

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

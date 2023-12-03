import { isNotNumber } from "./utils";

interface CalculateValues {
  height: number;
  mass: number;
}

// Doesn't have to be in functions
export const parseArguments = (args: string[]): CalculateValues => {
  // Merge into oen single if statement with "Wrong number of arguments"
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  // Clean code by throwing error inside if statement
  // Set variables outside if statement
  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

// Should be inside utils.ts
// So that the code can be used separately
// for command-line arguments in Exercise 9.3
// and for endpoints in Exercise 9.5
export const calculateBmi = (height: number, mass: number): string => {
  const BMI = mass / Math.pow(height / 100, 2);

  // Alternative solution: Use an array 'limits'
  // with objects of 'values' and 'types'
  // for (const { value, type } of limits) {
  //   if (bmi < value) {
  //     return type;
  //   }
  // }
  if (BMI < 16.0) return "Underweight (Severe thinness)";
  else if (BMI < 16.9) return "Underweight (Moderate thinness)";
  else if (BMI < 18.4) return "Underweight (Mild thinness)";
  else if (BMI < 24.9) return "Normal (healthy weight)";
  else if (BMI < 29.9) return "Overweight";
  else if (BMI < 34.9) return "Obese (Class I)";
  else if (BMI < 39.9) return "Obese (Class II)";
  else return "Obese (Class III)";
};

try {
  const { height, mass } = parseArguments(process.argv);
  console.log(calculateBmi(height, mass));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}

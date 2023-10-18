import express from "express";
import { parseArguments, calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
import { isNotNumber } from "./utils";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  try {
    const { height, mass } = parseArguments([
      "",
      "",
      String(req.query.height),
      String(req.query.weight),
    ]);
    res.send({
      weight: mass,
      height,
      bmi: calculateBmi(height, mass),
    });
  } catch (error) {
    res.status(400).send({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dailyExercises: any = req.body.daily_exercises;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const targetHrs: any = req.body.target;

  if (!dailyExercises || !targetHrs) {
    return res.status(400).send({ error: "parameters missing" });
  }

  const dailyHrs: number[] = [];
  for (let i = 0; i < dailyExercises.length; i++) {
    if (!isNotNumber(dailyExercises[i]) && !isNotNumber(targetHrs)) {
      dailyHrs.push(Number(dailyExercises[i]));
    } else {
      return res.status(400).send({ error: "malformatted parameters" });
    }
  }

  const result = calculateExercises(dailyHrs, Number(targetHrs));
  return res.send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

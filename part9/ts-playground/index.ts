import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { heightString, weightString } = req.query;
  if (!heightString || !weightString) {
    res.status(400).send('Missing height or weight');
  }
  const height = Number(heightString);
  const weight = Number(weightString);
  if (isNaN(height) || isNaN(weight)) {
    res.status(400).send('Invalid height or weight');
  }
  const bmi = calculateBmi(height, weight);
  res.send(bmi);
});
  
app.post('/exercises', (req, res) => {
  const { dailyExercises, target } = req.body;
  if (!dailyExercises || !target) {
    res.status(400).send({ error: 'missing parameters' });
    return;
  }
  if (!Array.isArray(dailyExercises)
    || dailyExercises.some((exercise: number) => isNaN(exercise))
    || typeof target !== 'number') {
    res.status(400).send({ error: 'malformatted parameters' });
    return;
  }
  const result = calculateExercises(dailyExercises, target);
  res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

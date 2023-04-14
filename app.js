const express = require('express');
const weightsRouter = require('./weights');
const { sequelize, Workout, Exercise } = require('./models');
const app = express();

app.use(express.json()); // enable parsing of JSON request bodies
app.use('/weights', weightsRouter); // use weightsRouter for requests to /weights

const port = 5432;

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/form', (req, res) => {
  res.render('form');
});


app.get('/:exercise', (req, res) => {
  const exercise = req.params.exercise;
  res.render(exercise);
});

app.get('/script.js', function(req, res) {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/public/script.js');
});

app.get('/exercises', async (req, res) => {
  try {
    const exercises = await Exercise.findAll({ include: Workout });
    res.render('exercises', { exercises });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


async function createWorkout() {
  const workout = await Workout.create({ date: new Date() });

  await Exercise.create({
    name: "Deadlift",
    sets: 3,
    reps: 10,
    weight: 50,
    workoutId: workout.id
  });

  await Exercise.create({
    name: "Squat",
    sets: 3,
    reps: 10,
    weight: 50,
    workoutId: workout.id
  });

  await Exercise.create({
    name: "Bench Press",
    sets: 3,
    reps: 10,
    weight: 50,
    workoutId: workout.id
  });
}


async function getWorkouts() {
  const workouts = await Workout.findAll({
    include: Exercise
  });

  console.log(JSON.stringify(workouts, null, 2));
}

(async () => {
  await sequelize.sync();

  await createWorkout();
  await getWorkouts();

  process.exit();
})();

//TRY

app.post('/add-exercise', async (req, res) => {
  const { name, sets, reps, weight } = req.body;

  // Validate the form data
  if (!name || !sets || !reps || !weight) {
    res.status(400).send('All fields are required.');
    return;
  }

  // Insert the data into the database
  try {
    const exercise = await Exercise.create({
      name,
      sets,
      reps,
      weight
    });
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

app.get('/edit/:id', async (req, res) => {
  const exerciseId = req.params.id;

  try {
    const exercise = await Exercise.findOne({ where: { id: exerciseId } });
    res.render('edit', { exercise });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred.');
  }
});

app.put('/edit/:id', async (req, res) => {
  const exerciseId = req.params.id;
  const { name, sets, reps, weight } = req.body;

  // Validate the form data
  if (!name || !sets || !reps || !weight) {
    res.status(400).send('All fields are required.');
    return;
  }

  // Update the data in the database
  try {
    const exercise = await Exercise.findOne({ where: { id: exerciseId } });
    exercise.name = name;
    exercise.sets = sets;
    exercise.reps = reps;
    exercise.weight = weight;
    await exercise.save();
    res.redirect


  
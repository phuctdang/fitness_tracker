const express = require('express');
const app = express();

PORT = 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const client = require('./db/client.js');
client.connect();

const { getAllExcercises, createExcercise } = require('./db/excercises.js');
const { getAllRoutines, createRoutine } = require('./db/routines.js');
const { createExcerciseRoutine } = require('./db/excercises_routines.js');

app.get('/api/v1/excercises', async(req, res, next) => {
  try {
    const allExcercises = await getAllExcercises();
    res.send(allExcercises);
  } catch (error) {next(error)};
});

app.get('/api/v1/routines', async(req, res, next) => {
  try {
    const allRoutines = await getAllRoutines();
    res.send(allRoutines);
  } catch(error) {next(error)};
});

app.post('/api/v1/excercises', async(req, res, next) => {
  try {
    const { name, description } = req.body;
    const newExcercise = await createExcercise(name, description);

    res.send(newExcercise); 
  } catch(error) {next(error)};
})

app.post('/api/v1/routines', async(req, res, next) => {
  try {
    const { name, goal, public } = req.body;
    const newRoutine = await createRoutine(name, goal, public);

    res.send(newRoutine);
  } catch(error) {next(error)};
})

app.post('/api/v1/excercises_routines', async(req, res, next) => {
  try {
    const { exId, routId, count } = req.body;
    const newER = createExcerciseRoutine(exId, routId, count);

    res.send(newER);
  } catch(error) {next(error)};
})
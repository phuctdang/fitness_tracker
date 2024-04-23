const client = require('./client.js');
const { createExcercise } = require('./excercises.js');
const { createRoutine } = require('./routines.js');
const { createExcerciseRoutine } = require('./excercises_routines.js');

const dropTables = async() => {
  try {
    // "Excercises_Routines" table have to be dropped FIRST becauce the other two tables are connected to it (so ordering matter here)
    await client.query(`
      DROP TABLE IF EXISTS excercises_routines;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS excercises;
    `);
  } catch(error) {console.log(error)};
};

const createTables = async() => {
  try {
    // remember to use backticks here
    await client.query(`
      CREATE TABLE excercises (
        id SERIAL PRIMARY KEY UNIQUE,
        name VARCHAR(50) NOT NULL,
        description text
      );

      CREATE TABLE routines (
        id SERIAL PRIMARY KEY UNIQUE,
        name VARCHAR(50) NOT NULL,
        goal text,
        is_public boolean
      );

      CREATE TABLE excercises_routines (
        id SERIAL PRIMARY KEY,
        excercise_id INT REFERENCES excercises(id),
        routine_id INT REFERENCES routines(id),
        count INT
      );
    `);
  } catch(error) {console.log(err)};
};


const syncAndSeed = async() => {

  await client.connect();
    console.log('Connected!');

  await dropTables();
    console.log('Tables Dropped!');

  await createTables();
    console.log('Tables Created!');

  const pushup = await createExcercise('Push-Ups', 'back straight, elbows tuck in, hands and shoulders parallel, go down slowly, engage back, breath');
  const situp = await createExcercise('Sit-Ups', 'bend legs with knees up and feet flat on the ground, cross hands to opposite shoulders, curl body up towards knees, engage core, go down slowly, breath');
  const squat = await createExcercise('Squats', 'spread legs out just past shoulder, knees and feet pointing slightly out or straight forward, feet planted flat and firm on ground, back straight, butt out, look forward, go down slowly, breath');
  const run = await createExcercise('Run', 'jog or run, erect spine, draw shoulders back, lean forward, relax arms, consistent pace');
    console.log('Excercises Created!');

  const opmF = await createRoutine('OPM', 'everyday, can split the excercise into multiple sets and do them throughout the day, harder, better, faster, stronger', 'false');
  const opmT = await createRoutine('OPM', 'everyday, can split the excercise into multiple sets and do them throughout the day, harder, better, faster, stronger', 'true');
    console.log('Routines Created!');
  
  await createExcerciseRoutine(pushup.id, opmF.id, 100);
  await createExcerciseRoutine(situp.id, opmF.id, 100);
  await createExcerciseRoutine(squat.id, opmF.id, 100);
  await createExcerciseRoutine(run.id, opmT.id, 1000);
   console.log('Excercises and Routines Created!');
  
  await client.end();
    console.log('Disconnected!');
};

syncAndSeed();
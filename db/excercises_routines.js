const client = require('./client.js');

const createExcerciseRoutine = async(excerciseID, routineID, count) => {
  try {
    const { rows: [ER] } = await client.query(`
      INSERT INTO excercises_routines (excercise_id, routine_id, count)
      VALUES ('${excerciseID}', '${routineID}', '${count}')
      RETURNING *;
    `);
    return ER;
  } catch(error) {console.log(error)};
};

module.exports = {
  createExcerciseRoutine,
};
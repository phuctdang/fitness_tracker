const client = require('./client.js');

const createRoutine = async(routineName, goal, public) => {
  try {
    const { rows: [routine] } = await client.query(`
      INSERT INTO routines (name, goal, is_public)
      VALUES ('${routineName}', '${goal}', '${public}')
      RETURNING *;
    `);
    return routine;
  } catch(error) {console.log(error)};
};

const getAllRoutines = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `)
    return rows;
  } catch(error) {console.log(error)};
}

module.exports = {
  createRoutine,
  getAllRoutines,
};
const client = require('./client.js');

// will need to make this dynamic by passing in a prop  for the 'VALUE'
const createExcercise = async(excerciseName, description) => {
  try {
    const { rows: [excercise] } = await client.query(`
      INSERT INTO excercises (name, description)
      VALUES ('${excerciseName}', '${description}')
      RETURNING *;
    `);
    return excercise;
  } catch(error) {console.log(error)};
};

const getAllExcercises = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM excercises;
    `)
    return rows;
  } catch(error) {console.log(error)};
}

module.exports = {
  createExcercise,
  getAllExcercises,
};
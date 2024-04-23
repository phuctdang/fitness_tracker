// This creates and define a client, but does NOT connect to the client
const { Client } = require('pg');
const client = new Client ('postgres://phuctdang:phDA501748!@localhost:5432/fitness_tracker')

module.exports = client;
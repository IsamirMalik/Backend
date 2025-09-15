const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json()); // for parsing application/json

const { Student, Course, Enrollment } = require('./shcema');
const routes = require('./routes');
app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

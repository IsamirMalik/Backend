const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());


const { Consultation, Doctor, Patient } = require('./schema');
const routes = require('./routes');

app.use('/api',routes);


const PORT =  3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

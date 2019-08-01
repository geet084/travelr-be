const express = require('express');
const app = express();
const cors = require('cors');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(cors());
app.use(express.json());

app.get('/api/v1/objects', (req, res) => {
  database('objects').select()
    .then(objects => {
      res.status(200).json(objects);
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

module.exports = app;
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/api/v1/test', (req, res) => {
  res.status(200).json('initial hookup successful')
})

module.exports = app;
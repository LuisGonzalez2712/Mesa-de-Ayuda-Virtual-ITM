// backend/index.js
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let solicitudes = [];

app.post('/solicitudes', (req, res) => {
  const nueva = req.body;
  solicitudes.push(nueva);
  res.status(201).json({ mensaje: 'Solicitud recibida', data: nueva });
});

app.get('/solicitudes', (req, res) => {
  res.json(solicitudes);
});

app.listen(4000, () => console.log('API corriendo en http://localhost:4000'));

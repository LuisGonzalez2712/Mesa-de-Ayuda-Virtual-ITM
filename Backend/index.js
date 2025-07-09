const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://MAVITM:MAVITM123@mesaayudacluster.wx2ji7e.mongodb.net/mesa-ayuda?retryWrites=true&w=majority&appName=MesaAyudaCluster')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Modelo de solicitud
const Solicitud = mongoose.model('Solicitud', {
  tipo: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

// POST: guardar solicitud
app.post('/solicitudes', async (req, res) => {
  try {
    const nueva = new Solicitud(req.body);
    await nueva.save();
    res.status(201).json({ mensaje: 'Solicitud guardada en MongoDB', data: nueva });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar solicitud' });
  }
});

// GET: obtener solicitudes
app.get('/solicitudes', async (req, res) => {
  const solicitudes = await Solicitud.find().sort({ fecha: -1 });
  res.json(solicitudes);
});

// Iniciar servidor
app.listen(4000, () => console.log('API corriendo en http://localhost:4000'));

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Esquema genérico (permite cualquier estructura)
const schemaFlexible = new mongoose.Schema({}, { strict: false });

// Modelos con nombres exactos de las colecciones
const LenguajesMundial = mongoose.model('LenguajesMundial', schemaFlexible, 'LenguajesMundial');
const LenguajesChile = mongoose.model('LenguajesChile', schemaFlexible, 'LenguajesChile');
const LenguajesLLMCHILE = mongoose.model('LenguajesLLMCHILE', schemaFlexible, 'LenguajesLLMCHILE');

// Rutas para cada colección
app.get('/LenguajesMundial', async (req, res) => {
  try {
    const datos = await LenguajesMundial.find();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos', error });
  }
});

app.get('/LenguajesChile', async (req, res) => {
  try {
    const datos = await LenguajesChile.find();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos', error });
  }
});

app.get('/LenguajesLLMCHILE', async (req, res) => {
  try {
    const datos = await LenguajesLLMCHILE.find();
    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener datos', error });
  }
});

// Puertoo
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

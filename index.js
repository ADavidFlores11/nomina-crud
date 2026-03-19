const express = require('express');
const cors = require('cors');
const initConnection = require('./db'); // conexión a Oracle
const percepcionesRoutes = require('./percepciones/percepciones.routes'); 
const deduccionesRoutes = require('./deducciones/deducciones.routes'); 

const app = express();
const PORT = 3000;

// 🔹 Habilitar CORS
app.use(cors());

// 🔹 Middleware para JSON
app.use(express.json());

// Ruta de prueba para verificar conexión a Oracle
app.get('/', async (req, res) => {
  const conn = await initConnection();
  if (conn) {
    res.send('Servidor de nómina conectado a Oracle 🚀');
    await conn.close();
  } else {
    res.status(500).send('Error al conectar con Oracle');
  }
});

// Rutas específicas
app.use('/percepciones', percepcionesRoutes);
app.use('/deducciones', deduccionesRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

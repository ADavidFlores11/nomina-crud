const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

// Configuración de conexión (ajusta según tu entorno)
const dbConfig = {
  user: "nomina_admin",
  password: "NominaGT_2026!",
  connectString: "localhost/FREEPDB1" // ejemplo, cambia según tu BD
};

// 🔹 Listar percepciones
router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
  `SELECT 
     ID_PERCEPCION AS codigo, 
     NOMBRE_PERCEPCION AS nombre, 
     DESCRIPCION_FORMULA AS descripcion 
   FROM percepciones 
   ORDER BY ID_PERCEPCION`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al listar percepciones");
  } finally {
    if (connection) await connection.close();
  }
});

// Crear percepción
router.post('/', async (req, res) => {
  const { codigo, nombre, descripcion } = req.body; // ahora recibes el ID también
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO percepciones (ID_PERCEPCION, NOMBRE_PERCEPCION, DESCRIPCION_FORMULA) 
       VALUES (:codigo, :nombre, :descripcion)`,
      { codigo, nombre, descripcion },
      { autoCommit: true }
    );
    res.status(201).send("Percepción creada correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear percepción");
  } finally {
    if (connection) await connection.close();
  }
});

// 🔹 Actualizar percepción
router.put('/:codigo', async (req, res) => {
  const { codigo } = req.params;
  const { nombre, descripcion } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
   await connection.execute(
  `UPDATE percepciones 
   SET NOMBRE_PERCEPCION = :nombre, DESCRIPCION_FORMULA = :descripcion 
   WHERE ID_PERCEPCION = :codigo`,
  { nombre, descripcion, codigo },
  { autoCommit: true }
    );
    res.send("Percepción actualizada correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar percepción");
  } finally {
    if (connection) await connection.close();
  }
});

// 🔹 Eliminar percepción
router.delete('/:codigo', async (req, res) => {
  const { codigo } = req.params;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
  `DELETE FROM percepciones WHERE ID_PERCEPCION = :codigo`,
  { codigo },
  { autoCommit: true }
    );
    res.send("Percepción eliminada correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar percepción");
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');

// Configuración de conexión (ajusta según tu entorno)
const dbConfig = {
  user: "nomina_admin",
  password: "NominaGT_2026!",
  connectString: "localhost/FREEPDB1" // ejemplo, cambia según tu BD
};

// 🔹 Listar deducciones
router.get('/', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT 
         ID_DEDUCCION AS codigo, 
         NOMBRE_DEDUCCION AS nombre, 
         DESCRIPCION_FORMULA AS descripcion 
       FROM deducciones 
       ORDER BY ID_DEDUCCION`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al listar deducciones");
  } finally {
    if (connection) await connection.close();
  }
});

// Crear deducción
router.post('/', async (req, res) => {
  const { codigo, nombre, descripcion } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO deducciones (ID_DEDUCCION, NOMBRE_DEDUCCION, DESCRIPCION_FORMULA) 
       VALUES (:codigo, :nombre, :descripcion)`,
      { codigo, nombre, descripcion },
      { autoCommit: true }
    );
    res.status(201).send("Deducción creada correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al crear deducción");
  } finally {
    if (connection) await connection.close();
  }
});

// 🔹 Actualizar deducción
router.put('/:codigo', async (req, res) => {
  const { codigo } = req.params;
  const { nombre, descripcion } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `UPDATE deducciones 
       SET NOMBRE_DEDUCCION = :nombre, DESCRIPCION_FORMULA = :descripcion 
       WHERE ID_DEDUCCION = :codigo`,
      { nombre, descripcion, codigo },
      { autoCommit: true }
    );
    res.send("Deducción actualizada correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar deducción");
  } finally {
    if (connection) await connection.close();
  }
});

// 🔹 Eliminar deducción
router.delete('/:codigo', async (req, res) => {
  const { codigo } = req.params;
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `DELETE FROM deducciones WHERE ID_DEDUCCION = :codigo`,
      { codigo },
      { autoCommit: true }
    );
    res.send("Deducción eliminada correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al eliminar deducción");
  } finally {
    if (connection) await connection.close();
  }
});

module.exports = router;
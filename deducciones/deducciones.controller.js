const oracledb = require('oracledb');

const dbConfig = {
  user: "tu_usuario",
  password: "tu_password",
  connectString: "localhost/XEPDB1" // ajusta según tu entorno
};

// 🔹 Listar deducciones
async function listarDeducciones(req, res) {
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
}

// 🔹 Crear deducción
async function crearDeduccion(req, res) {
  const { nombre, descripcion } = req.body;
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
}

// 🔹 Actualizar deducción
async function actualizarDeduccion(req, res) {
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
}

// 🔹 Eliminar deducción
async function eliminarDeduccion(req, res) {
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
}

module.exports = {
  listarDeducciones,
  crearDeduccion,
  actualizarDeduccion,
  eliminarDeduccion
};
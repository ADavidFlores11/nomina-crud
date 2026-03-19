const oracledb = require('oracledb');
const dbConfig = { user: "tu_usuario", password: "tu_password", connectString: "localhost/XEPDB1" };

// Listar percepciones
async function listarPercepciones(req, res) {
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
}

// Crear percepción
async function crearPercepcion(req, res) {
  const { nombre, descripcion } = req.body;
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
}

// Actualizar percepción
async function actualizarPercepcion(req, res) {
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
}

// Eliminar percepción
async function eliminarPercepcion(req, res) {
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
}

module.exports = {
  listarPercepciones,
  crearPercepcion,
  actualizarPercepcion,
  eliminarPercepcion
};
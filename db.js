const oracledb = require('oracledb');

async function initConnection() {
  try {
    const connection = await oracledb.getConnection({
      user: "nomina_admin",
      password: "NominaGT_2026!",
      connectString: "localhost:1521/FREEPDB1"
    });

    console.log("Conexión a Oracle exitosa 🚀");
    return connection;
  } catch (err) {
    console.error("Error al conectar a Oracle:", err);
  }
}

module.exports = initConnection;

const { connectToDatabase, closeConnection } = require("./conection");

const setupDatabase = async () => {
  console.log("dbSetup--setupDatabase    Before all tests");
  await connectToDatabase();
  console.log("dbSetup--setupDatabase    Conexión a MongoDB establecida");
};

const teardownDatabase = async () => {
  console.log("dbSetup--teardownDatabase After all tests");
  // Cerrar la conexión a MongoDB después de todas las pruebas
  await     closeConnection();
  console.log("dbSetup--teardownDatabase  Conexión a MongoDB cerrada");
};

module.exports = { setupDatabase, teardownDatabase };
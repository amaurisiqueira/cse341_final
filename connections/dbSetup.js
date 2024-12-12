
const { connectToDatabase, closeConnection } = require("./conection");

const setupDatabase = async () => {
  console.log("Before all tests");
  await connectToDatabase();
  console.log("Conexión a MongoDB establecida");
};

const teardownDatabase = async () => {
  console.log("After all tests");
  // Cerrar la conexión a MongoDB después de todas las pruebas
  await     closeConnection();
  console.log("Conexión a MongoDB cerrada");
};

module.exports = { setupDatabase, teardownDatabase };
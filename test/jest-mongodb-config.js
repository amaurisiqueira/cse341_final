const { connectToDatabase } = require("../connections/conection");


module.exports = async () => {
  beforeAll(async () => {
    console.log("Before all tests");
    await connectToDatabase();
    console.log("Conexión a MongoDB establecida");
  });

  afterAll(async () => {
    console.log("After all tests");
    // Cerrar la conexión a MongoDB después de todas las pruebas
    await database.close();
    console.log("Conexión a MongoDB cerrada");
  });
};
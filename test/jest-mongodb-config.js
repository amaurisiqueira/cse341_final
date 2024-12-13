const { connectToDatabase } = require("../connections/conection");


module.exports = async () => {
  beforeAll(async () => {
    console.log("jest-mongodb-config---- Before all tests");
    await connectToDatabase();
    console.log("jest-mongodb-config---- Conexión a MongoDB establecida");
  });

  afterAll(async () => {
    console.log("jest-mongodb-config---- After all tests");
    // Cerrar la conexión a MongoDB después de todas las pruebas
    await database.close();
    console.log("jest-mongodb-config---- Conexión a MongoDB cerrada");
  });
};
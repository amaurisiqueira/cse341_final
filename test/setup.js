const { MongoClient } = require("mongodb");

const { initDb, getDatabase } = require("../connections/conection");

beforeAll(async () => {
  await new Promise((resolve, reject) => {
    initDb((err, db) => {
      if (err) {
        reject(err);
      } else {
        console.log("Base de datos inicializada");
        resolve(db);
      }
    });
  });
});

afterAll(async () => {
  const db = getDatabase();
  if (db) {
    await db.close(); // Cierra la conexión si es necesario
    console.log("Conexión a la base de datos cerrada");
  }
});

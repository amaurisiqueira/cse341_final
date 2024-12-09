const env = require("dotenv");

env.config();

const MongoClient = require("mongodb").MongoClient;
let database;

const initDb = (callback) => {
  if (database) {
    console.log("DB is already initialized!");
    return callback(null, database);
  }

  // Construye la cadena de conexión con el nombre de la base de datos
  // const connectionString = `${process.env.MONGODB_URI}/${DatabaseName}`;

  MongoClient.connect(process.env.MONGODB_URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDatabase = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = { initDb, getDatabase };

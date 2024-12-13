const env = require("dotenv");

env.config();

const MongoClient = require("mongodb").MongoClient;
let database;
let client; 

// Función para establecer la conexión a MongoDB
const connectToDatabase = async () => {
  if (database) {
    console.log("conection -- connectToDatabase--  DB is already initialized!");
    return database;
  }

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI); // Asigna el cliente a la variable client
    database = client.db("final");
    console.log("conection -- connectToDatabase--  DB is connecting..");
    return database;
  } catch (err) {
    throw err;
  }
};

// Función para cerrar la conexión a MongoDB
const closeConnection = async () => {

  console.log("conection --closeConnection  DB is closing..");
  if (client) {
    await client.close();
  }
  console.log("conection --closeConnection  DB is closed..");
};


// Función para obtener la base de datos
const getDatabase = () => {

  // console.log("getDatabase  database:",database);
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};


// Exporta las funciones para ser utilizadas en otras partes de la aplicación
module.exports = { connectToDatabase, getDatabase, closeConnection };
		
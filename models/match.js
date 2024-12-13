const mongodb = require("../connections/conection");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .collection("maches")
    .find();

  return result;
};

const createSingle = async (match) => {
  const result = await mongodb
    .getDatabase()
    .collection("maches")
    .insertOne(match);

  return result;
};

const updateSingle = async (matchId, match) => {
  return (result = await mongodb
    .getDatabase()
    .collection("maches")
    .replaceOne({ _id: matchId }, match));
};

/*
const deleteSingle = async (matchId) => {

  console.log(` match.js -- deleteSingle  ---  matchId : ${matchId}`)

  const result = await mongodb
    .getDatabase()
    .collection("maches")
    .findOneAndDelete({ _id: matchId })
//    .deleteOne({ _id: matchId })

    console.log(` match.js -- deleteSingle  ---  result.deletedCount : ${result}`)

  return (result);
};
*/

/*
const deleteSingle = async (matchId) => {
  console.log(`match.js -- deleteSingle --- matchId : ${matchId}`);

  try {
    // Convierte matchId a ObjectId si es necesario
    const id = ObjectId.isValid(matchId) ? ObjectId(matchId) : null;

    if (!id) {
      console.log(`match.js -- deleteSingle --- Invalid ID format: ${matchId}`);
      return { ok: 0, message: 'Invalid ID format' };
    }

    const result = await mongodb
      .getDatabase()
      .collection("maches") // Corrige el nombre de la colección
      .findOneAndDelete({ _id: id });

    if (result.value) { // Verifica si se encontró y eliminó un documento
      console.log(`match.js -- deleteSingle --- Document deleted: ${result.value}`);
      return { ok: 1, deletedDocument: result.value };
    } else {
      console.log(`match.js -- deleteSingle --- No document found with ID: ${matchId}`);
      return { ok: 0, message: 'No document found' };
    }
  } catch (error) {
    console.error(`match.js -- deleteSingle --- Error: ${error.message}`);
    return { ok: 0, message: 'Error deleting document' };
  }
};*/
const deleteSingle = async (matchId) => {
  console.log(`match.js -- deleteSingle --- matchId : ${matchId}`);

  const result = await mongodb
    .getDatabase()
    .collection("maches") // Asegúrate de que el nombre de la colección sea correcto
//    .deleteOne({ _id: ObjectId.createFromHexString(matchId) });
    .deleteOne({ _id: new ObjectId(matchId) });

  if (result.deletedCount > 0) {
    console.log(`match.js -- deleteSingle --- Document deleted, deletedCount: ${result.deletedCount}`);
    return { ok: 1, deletedCount: result.deletedCount };
  } else {
    console.log(`match.js -- deleteSingle --- No document found with ID: ${matchId}`);
    return { ok: 0, message: 'No document found' };
  }
};
		

module.exports = {
  getAll,
  createSingle,
  updateSingle,
  deleteSingle,
};

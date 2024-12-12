/*
// Esquema para la colección fanInteractions
const fanInteractionSchema = new mongoose.Schema({
  fanId: mongoose.Schema.Types.ObjectId,
  interactionType: String,
  content: mongoose.Schema.Types.Mixed,
  date: Date,
});

*/
const mongodb = require("../connections/conection");

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    // .db("final")
    .collection("fanInteraction")
    .find();
  return result;
};

const createSingle = async (club) => {
  const result = await mongodb
    .getDatabase()
    // .db("final")
    .collection("fanInteraction")
    .insertOne(club);

  return result;
};

const updateSingle = async (clubId, club) => {
  return (result = await mongodb
    .getDatabase()
    // .db("final")
    .collection("fanInteraction")
    .replaceOne({ _id: clubId }, club));
};

const deleteSingle = async (clubId) => {
  return (result = await mongodb
    .getDatabase()
    // .db("final")
    .collection("fanInteraction")
    .deleteOne({ _id: clubId }));
};

module.exports = {
  getAll,
  createSingle,
  updateSingle,
  deleteSingle,
};

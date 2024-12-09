/*
 const fanProfileSchema = new mongoose.Schema({
  name: String,
  favoriteClubs: [String],
  preferences: mongoose.Schema.Types.Mixed,
});
*/
const mongodb = require("../connections/conection");

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db("final")
    .collection("fanProfile")
    .find();
  return result;
};

const createSingle = async (club) => {
  const result = await mongodb
    .getDatabase()
    .db("final")
    .collection("fanProfile")
    .insertOne(club);

  return result;
};

const updateSingle = async (clubId, club) => {
  return (result = await mongodb
    .getDatabase()
    .db("final")
    .collection("fanProfile")
    .replaceOne({ _id: clubId }, club));
};

const deleteSingle = async (clubId) => {
  return (result = await mongodb
    .getDatabase()
    .db("final")
    .collection("fanProfile")
    .deleteOne({ _id: clubId }));
};

module.exports = {
  getAll,
  createSingle,
  updateSingle,
  deleteSingle,
};

const mongodb = require("../connections/conection");

const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db("final")
    .collection("maches")
    .find();

  return result;
};

const createSingle = async (match) => {
  const result = await mongodb
    .getDatabase()
    .db("final")
    .collection("maches")
    .insertOne(match);

  return result;
};

const updateSingle = async (matchId, match) => {
  return (result = await mongodb
    .getDatabase()
    .db("final")
    .collection("maches")
    .replaceOne({ _id: matchId }, match));
};

const deleteSingle = async (matchId) => {
  return (result = await mongodb
    .getDatabase()
    .db("final")
    .collection("maches")
    .deleteOne({ _id: matchId }));
};

module.exports = {
  getAll,
  createSingle,
  updateSingle,
  deleteSingle,
};

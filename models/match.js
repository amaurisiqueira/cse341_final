const mongodb = require("../connections/conection");
const DatabaseName = require("../utils/getKey");
const getAll = async (req, res) => {
  const result = await mongodb
    .getDatabase()
    .db(DatabaseName)
    .collection("maches")
    .find();

  return result;
};

const createSingle = async (match) => {
  const result = await mongodb
    .getDatabase()
    .db(DatabaseName)
    .collection("maches")
    .insertOne(match);

  return result;
};

const updateSingle = async (matchId, match) => {
  return (result = await mongodb
    .getDatabase()
    .db(DatabaseName)
    .collection("maches")
    .replaceOne({ _id: matchId }, match));
};

const deleteSingle = async (matchId) => {
  return (result = await mongodb
    .getDatabase()
    .db(DatabaseName)
    .collection("maches")
    .deleteOne({ _id: matchId }));
};

module.exports = {
  getAll,
  createSingle,
  updateSingle,
  deleteSingle,
};

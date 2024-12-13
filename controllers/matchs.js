//const ObjectId = require("mongodb").ObjectId;
const { ObjectId } = require("mongodb");
const matchData = require("../models/match");
const validateMatch = require("../validation/validateMatch");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
  const result = await matchData.getAll();

  try {
    result.toArray().then((users) => {
      res.setHeader("Content-type", "application/json");
      res.status(200).json(users);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createMatch = async (req, res) => {
  await Promise.all(validateMatch.map((validation) => validation.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    let match;
    if (req.body._id) {
      match = {
        _id: req.body._id,
        stadium: req.body.stadium,
        team1: req.body.team1,
        team2: req.body.team2,
        team1goals: req.body.team1goals,
        team2goals: req.body.team2goals,
        referee: req.body.referee,
        date: req.body.date,
      };
    } else {
      match = {
        stadium: req.body.stadium,
        team1: req.body.team1,
        team2: req.body.team2,
        team1goals: req.body.team1goals,
        team2goals: req.body.team2goals,
        referee: req.body.referee,
        date: req.body.date,
      };
    }

    console.log(" match:", match);
    const result = await matchData.createSingle(match);

    if (result.acknowledged) {
      res.status(204).send();
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateMatch = async (req, res) => {
  await Promise.all(validateMatch.map((validation) => validation.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const match = {
      stadium: req.body.stadium,
      team1: req.body.team1,
      team2: req.body.team2,
      team1goals: req.body.team1goals,
      team2goals: req.body.team2goals,
      referee: req.body.referee,
      date: req.body.date,
    };
    const clubId =    ObjectId.createFromHexString(req.params.id);
    const result = await matchData.updateSingle(clubId, match);

    if (result.acknowledged) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Bad request, invalid input" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const deleteMatch = async (req, res) => {
  try {
    // const clubId =   ObjectId.createFromHexString(req.params.id);
    const clubId =   req.params.id;

    console.log(`  matchs -- deleteMatch -- receive ID: ${clubId}`);


    const result = await matchData.deleteSingle(clubId);

    console.log(`  matchs -- deleteMatch --  result: ${result}`);

    console.log(`  matchs -- deleteMatch --  result.deletedCount): ${result}`);

    //if (result.deletedCount) {
    if (result &&  result.deletedCount) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Bad request, invalid input" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getAll, createMatch, updateMatch, deleteMatch };

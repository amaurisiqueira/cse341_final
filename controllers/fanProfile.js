const ObjectId = require("mongodb").ObjectId;
const modelFanProfile = require("../models/fanProfile");
const validateFanProfile = require("../validation/validateFanProfile");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
  const result = await modelFanProfile.getAll();

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

const createFanProfile = async (req, res) => {
  await Promise.all(
    validateFanProfile.map((validation) => validation.run(req))
  );
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const fanProfile = {
      name: req.body.name,
      favoriteClubs: req.body.favoriteClubs,
      preferences: req.body.preferences,
    };

    const result = await modelFanProfile.createSingle(fanProfile);

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

const updateFanProfile = async (req, res) => {
  await Promise.all(
    validateFanProfile.map((validation) => validation.run(req))
  );
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
    const fanProfile = {
      name: req.body.name,
      favoriteClubs: req.body.favoriteClubs,
      preferences: req.body.preferences,
    };
    const clubId = new ObjectId(req.params.id);
    const result = await modelFanProfile.updateSingle(clubId, fanProfile);

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
const deleteFanProfile = async (req, res) => {
  try {
    const clubId = new ObjectId(req.params.id);
    const result = await modelFanProfile.deleteSingle(clubId);

    if (result.deletedCount) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Bad request, invalid input" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAll,
  createFanProfile,
  updateFanProfile,
  deleteFanProfile,
};

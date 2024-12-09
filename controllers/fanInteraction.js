const ObjectId = require("mongodb").ObjectId;
const modelFanInteraction = require("../models/fanInteraction");
const validateFanInteraction = require("../validation/validateFanInteraction");
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
  const result = await modelFanInteraction.getAll();

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

const createFanInteraction = async (req, res) => {
  await Promise.all(
    validateFanInteraction.map((validation) => validation.run(req))
  );
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {

           
      
    const FanInteraction = {
        name:req.body.name,
        interactionType:req.body.interactionType ,
        content:req.body.content,
        date:req.body.date,
    };

    const result = await modelFanInteraction.createSingle(FanInteraction);

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

const updateFanInteraction = async (req, res) => {
  await Promise.all(
    validateFanInteraction.map((validation) => validation.run(req))
  );
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() });
  }

  try {
      
    const FanInteraction = {
        name:req.body.name,
        interactionType:req.body.interactionType ,
        content:req.body.content,
        date:req.body.date,
    };

    const clubId = new ObjectId(req.params.id);
    const result = await modelFanInteraction.updateSingle(clubId, FanInteraction);

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
const deleteFanInteraction = async (req, res) => {
  try {
    const clubId = new ObjectId(req.params.id);
    const result = await modelFanInteraction.deleteSingle(clubId);

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
  createFanInteraction,
  updateFanInteraction,
  deleteFanInteraction,
};

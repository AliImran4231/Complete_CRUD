const asyncHanlder = require("express-async-handler");

const Goal = require("../models/goalModel");
//@desc Get goals
//@route  GET /api/goals
//@access private
const getGoals = asyncHanlder(async (req, res) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

//@desc Set goal
//@route  POST /api/goals
//@access private
const setGoal = asyncHanlder(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add the Text field");
  }

  const goals = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goals);
});

//@desc Update goal
//@route  PUT /api/goals/:id
//@access private
const updateGoal = asyncHanlder(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not found");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Delete goal
//@route  DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHanlder(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not found");
  }
  await goal.deleteOne();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};

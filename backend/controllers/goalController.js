const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");
const User = require("../models/userModel");
//@desc Get goals
//@route  GET /api/goals
//@access private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({user: req.user.id});

  res.status(200).json(goals);
});

//@desc Set goal
//@route  POST /api/goals
//@access private
const setGoal = asyncHandler(async (req, res) => {
  // console.log("BODY:", req.body);

  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add the Text field");
  }

  const goals = await Goal.create({
    text: req.body.text,
    user:req.user.id
  });

  res.status(200).json(goals);
});

//@desc Update goal
//@route  PUT /api/goals/:id
//@access private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  //Check for User

  if(!User){
    res.status(401)
    throw new Error('User not Found')
  }

  //Make sure the logged in user matches the goal user

  if (goal.user.toString() !==User.id) {
    res.status(401);
    throw new Error("User Not Authorized");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

//@desc Delete goal
//@route  DELETE /api/goals/:id
//@access private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal Not found");
  }

    goal = await Goal.findById(req.params.id);

  //Check for User

  if(!User){
    res.status(401)
    throw new Error('User not Found')
  }

  //Make sure the logged in user matches the goal user

  if (goal.user.toString() !==User.id) {
    res.status(401);
    throw new Error("User Not Authorized");
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

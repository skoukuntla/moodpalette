const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//params --> what is in the url
//body --> what is sent in the request

//update user
router.put("/:userId", async (req, res) => {
  console.log(req.body.userId, req.params.userId);

  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//delete user
router.delete("/:userId", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//get a user
// router.get("/:userId", async (req, res) => {

//   // pass in userId or username,, not both
//   const userId = req.query.userId;
//   const username = req.query.username;
//   console.log(username)
//   try {
//     const user = userId
//       ? await User.findById(userId) // if userId is given, find by userId, else find by username
//       : await User.findOne({ username: username });
//     const { password, updatedAt, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/addHabit", async (req, res) => {
  console.log("entered addHabit api call");
  try {
    const currentUser = await User.findOne({ username: req.body.username });
    await currentUser.updateOne({ $push: { userHabits: req.body.habit } }); // update your habits array with a SINGULAR habit
    return res.status(200).json("Habit has been added!");
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("/deleteHabit", async (req, res) => {
  // console.log("entered deleteHabit api call")
  // console.log("req body", req.body)
  try {
    const currentUser = await User.findOne({ username: req.body.username }); // yourself
    await currentUser.updateOne({ $pull: { userHabits: req.body.habit } }); // remove from your userHabits array
    return res.status(200).json("Habit has been deleted!");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// router.put("/updateHabit", async (req, res) => {
//   try {
//     const currentUser = await User.findOne({ username: req.body.username }); // yourself
//     await currentUser.updateOne({ $set: { [`userHabits.${req.body.oldHabit}`]: "some new habit"} });
//     // await currentUser.updateOne({ $set: { userHabits: req.body.habit } }); // updating habit from your userHabits array
//     return res.status(200).json("Habit has been updated!");
//   } catch (err) {
//     return res.status(500).json(err);
//   }
// });

module.exports = router;

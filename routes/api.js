const router = require("express").Router();
const Workout = require("../models/workout.js");


router.get('/api/workouts', async (req, res) => {
    await Workout.aggregate([{
    $addFields: {
      totalDuration: {
        $sum: '$exercises.duration'
      }
    }
  }])
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
})

router.put('/api/workouts/:id', (req, res) => {
  console.log(req.body)
  Workout.updateOne(
    { _id: req.params.id }, 
    { $push: { exercises: req.body } }
    )
  .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})

router.post('/api/workouts', (req, res) => {
  Workout.create(req.body)
  .then(dbWorkout => {
    console.log(dbWorkout)
    res.json.apply(dbWorkout)
  })
  .catch(err => {
    res.status(400).json(err);
  })
})

router.get('/api/workouts/range', async (req, res) => {
  await Workout.aggregate([{
    $addFields: {
      totalDuration: {
        $sum: '$exercises.duration'
      }
    }
  }])
  .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
})


module.exports = router; 
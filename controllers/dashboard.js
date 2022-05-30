const express = require('express')
const Workout = require('../models/workout')
const Router = express.Router()

Router.get('/', (req, res) => {
    Workout.find({}, (error, allWorkouts) => {
        console.log(allWorkouts)
        res.render('dashboard/index.ejs', {workouts: allWorkouts})
    })
})

module.exports = Router
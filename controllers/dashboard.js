const express = require('express')
const Workout = require('../models/workout')
const Router = express.Router()

// INDUCES (index, new, delete, update, create, edit, show)

// Index
Router.get('/', (req, res) => {
    Workout.find({}, (error, allWorkouts) => {
        // console.log(allWorkouts)
        res.render('dashboard/index.ejs', {workouts: allWorkouts})
    })
})

// Edit

Router.get('/:id/edit', (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkoutDay) => {
        res.render('./dashboard/edit.ejs', {
            workoutDay: foundWorkoutDay
        })
    })
})

// Show
Router.get('/:id', (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkoutDay) => {
        // console.log(foundWorkoutDay) 
        res.render('./dashboard/show.ejs', {
            workoutDay: foundWorkoutDay
        })
    })
})

module.exports = Router
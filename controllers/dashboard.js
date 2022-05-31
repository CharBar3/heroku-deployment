const express = require('express')
const { findByIdAndUpdate } = require('../models/workout')
// const { update } = require('../models/workout')
const Workout = require('../models/workout')
const Router = express.Router()

// INDUCES (index, new, delete, update, create, edit, show)

// Index
Router.get('/', (req, res) => {
    Workout.find({}, (error, allWorkouts) => {
        res.render('dashboard/index.ejs', {workouts: allWorkouts})
    })
})

// New
Router.get('/new', (req, res) => {
    res.render('dashboard/new.ejs')
})


// Delete
Router.delete('/:id', (req, res) => {
    Workout.findByIdAndDelete(req.params.id, (err, foundWorkoutDay) => {
        console.log(foundWorkoutDay)
        console.log(foundWorkoutDay.title + ' Deleted')
        res.redirect('/')
    })
})

// Update 
Router.patch('/:id/removeexercise', (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkoutDay) => {
    const exerciseID = parseInt(req.body.ID)
    foundWorkoutDay.exercises.splice(exerciseID, 1)
    req.body.exercises = foundWorkoutDay.exercises
    console.log(req.body.exercises)
    
    Workout.findByIdAndUpdate(req.params.id, req.body, 
        {
        new: true
        },
        (err, updatedWorkoutDay) => {
        console.log(updatedWorkoutDay)
        res.redirect(`/dashboard/${req.params.id}/edit`)
    })
    })
})

Router.patch('/:id', (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkoutDay) => {
        const exerciseID = parseInt(req.body.ID)
        const exerciseToUpdate = req.body
        const exerciseToUpdateArray = Object.entries(exerciseToUpdate)
        const newSets = []
        for (let index = 0; index < exerciseToUpdateArray.length; index++) {
            const value = exerciseToUpdateArray[index]
            if (value[0].startsWith('reps')) {
                const lastCharacter = value[0].substring(value[0].length-1)
                newSets[lastCharacter-1] = {reps: value[1]}
            }
            if (value[0].startsWith('weights')) {
                const lastCharacter = value[0].substring(value[0].length-1)
                newSets[lastCharacter-1].weight = value[1]
            }
        }
        const updateExercise = {
            name: exerciseToUpdate.name,
            sets: newSets,
            notes: exerciseToUpdate.notes
        }
        req.body.exercises = foundWorkoutDay.exercises

        req.body.exercises[exerciseID] = updateExercise
        Workout.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true
            },
            (err, updatedWorkoutDay) => {
            
                

            res.redirect(`/dashboard/${req.params.id}/edit`)
        })
    })
})

// Create
const emptyWorkout = require('../models/templateWorkout.js')
Router.post('/create', (req, res) => {
    Workout.create(emptyWorkout, (error, data) => {
        res.redirect(`/dashboard/${data.id}/edit`)
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
        res.render('./dashboard/show.ejs', {
            workoutDay: foundWorkoutDay
        })
    })
})

module.exports = Router
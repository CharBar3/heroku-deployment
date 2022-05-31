const express = require('express')
const Workout = require('../models/workout')
const Router = express.Router()

// INDUCES (index, new, delete, update, create, edit, show)

// Index
Router.get('/', (req, res) => {
    Workout.find({}, (error, allWorkouts) => {
        res.render('dashboard/index.ejs', {workouts: allWorkouts})
    })
})

// Update
Router.patch('/:id', (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkoutDay) => {
        
        console.log(req.body)
        const exercises = foundWorkoutDay.exercises
        for (const [key, value] of Object.entries(exercises)){
            // console.log(value)
            
            for (let index = 0; index < value.sets.length; index++) {
                const element = value.sets[index];
                // console.log(element)
            }
        }
        // for (let index = 0; index < exercises.length; index++) {
        //     const element = exercises[index];
        //     console.log(element)
        // }


        
        res.redirect(`/dashboard/${req.params.id}`)
    })


    


    // Workout.findByIdAndUpdate(
    //     req.params.id, 
    //     req.body, 
    //     { new: true }, 
    //     (err, foundWorkoutDay) => {
    //         // console.log(req.body)
    //         // console.log(req.body.exercises[0].sets[0].reps)
    //     console.log(foundWorkoutDay)
    //     // console.log(foundWorkoutDay.exercises[0].name)
    //     // console.log(foundWorkoutDay.exercises[0].sets[0].reps)
    //     // foundWorkoutDay.exercises[0].sets[0].reps

    //     res.redirect(`/dashboard/${req.params.id}`)
    // })



    
    // Workout.findById(req.params.id, (err, foundWorkoutDay) => {
    //     const exerciseNames = Object.keys(req.body)
    //     // console.log(exerciseNames) 
    //     const exercises = []
    //     for (let index = 0; index < exerciseNames.length; index++) {
    //         const key = exerciseNames[index];
    //         if (key.startsWith('Exercise')) {
    //             const splitKey = key.split('-')
    //             console.log(splitKey, req.body[key])
    //             if (splitKey.length === 2) {
    //                 const exercise = {
    //                     name: req.body[key],
    //                     sets: []
    //                 }
    //                 exercises.push(exercise)
    //             } else { 
    //                 exercises.find()
    //                 if (splitKey[4] === 'Reps') {
                            
    //                     }
    //             }

    //         }
    //     }
    //     console.log(exercises)
    //     const emptyObj = {
    //         ...foundWorkoutDay,
    //         title: req.body.title
            
    //     }
    // })
    
    
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
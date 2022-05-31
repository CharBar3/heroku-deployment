const express = require('express')
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

// Update
Router.patch('/:id', (req, res) => {
    Workout.findById(req.params.id, (err, foundWorkoutDay) => {
        // console.log(foundWorkoutDay)
        const exerciseID = parseInt(req.body.ID)
        // foundWorkoutDay.exercises[exerciseID].name = req.body.name
        const exerciseToUpdate = req.body
        // console.log('before we did anything to it', exerciseToUpdate)
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
            notes: 'notes updated'
        }

        // console.log(updateExercise)

        req.body.exercises = foundWorkoutDay.exercises
        req.body.exercises[exerciseID] = updateExercise
        

        // {
        //     name: 'shoulder press',
        //     sets: [{reps: 10, weight: '100lbs'}, {reps: 10, weight: '100lbs'}, {reps: 10, weight: '100lbs'}],
        //     notes: 'fealt strong the whole way through'
        // }

        Workout.findByIdAndUpdate(req.params.id, req.body,
            {
                new: true
            },
            (err, updatedWorkoutDay) => {
            
            
            // console.log('from req.body >>> ', req.body)
            const exerciseID = parseInt(req.body.ID)
            
            // const exercises = updatedWorkoutDay.exercises
            // console.log('from exercises', exercises[ID])
    
            // updatedWorkoutDay.exercises[exerciseID].name = req.body.name
            // console.log(updatedWorkoutDay.exercises[exerciseID].name)
                // if (updatedWorkoutDay.save()) {
                //     console.log("success")
                // }
                updatedWorkoutDay.save().then( () => res.redirect(`/dashboard/${req.params.id}/edit`))
    
            // console.log(updatedWorkoutDay)
    
            // for (const [key, value] of Object.entries(exercises)){
                // console.log(value)
                
                // for (let index = 0; index < value.sets.length; index++) {
                //     const element = value.sets[index];
                    // console.log(element)
            //     }
            // }
            // for (let index = 0; index < exercises.length; index++) {
            //     const element = exercises[index];
            //     console.log(element)
            // }
            
        })
    })
    
    // find by id

    // pull exercises in find by id

    // 
    

    // write the logic for exercises out here so that it'll fucking work


    


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
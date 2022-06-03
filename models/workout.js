const mongoose = require('mongoose')
const Schema = mongoose.Schema

const setSchema = new Schema({
    reps: Number,
    weight: Number
})

const exerciseSchema = new Schema({
        name: String,
        sets: [setSchema],
        notes: String
})

const workoutSchema = new Schema({
    title: {type: String, required: true},
    exercises: [exerciseSchema],
    date: {type: Date}
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
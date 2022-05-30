const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = Schema({
    title: {type: String, required: true},
    exercises: {type: Array},
    date: {type: Date}
})

const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout
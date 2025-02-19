const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find();
        res.status(200).json(workouts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getWorkout = async (req, res) => {
    const { id } = req.params;

    try {
        const workout = await Workout
            .findById(id);
        res.status(200).json(workout);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createWorkout = async (req, res) => {
    const workout = req.body;

    const newWorkout = new Workout(workout);

    try {
        await newWorkout.save();
        res.status(201).json(newWorkout);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateWorkout = async (req, res) => {
    const { id } = req.params;
    const workout = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No workout with that id');

    const updatedWorkout = await Workout.findByIdAndUpdate(id, { ...workout, id }, { new: true });

    res.json(updatedWorkout);
}

const deleteWorkout = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No workout with that id');

    await Workout.findByIdAndRemove(id);

    res.json({ message: 'Workout deleted successfully' });
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}
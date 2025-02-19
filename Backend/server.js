require ('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workout');

const app = express();

app.use(express.json());

app.use((req, res, next) => { // ✅ Add `next` as a parameter
    console.log(req.path, req.method);
    next(); // ✅ Call `next()` to pass control to the next middleware
});


app.use('/api/workouts', workoutRoutes);

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
})
.catch((error) => {
    console.log(error.message);
});

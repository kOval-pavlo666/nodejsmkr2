const { port, mongodb_uri } = require('./config');
const multer = require('multer');

const mongoose = require('mongoose');
const express = require('express');
const createError = require('http-errors');

const startScheduleJobs = require('./jobs');

const pasaghyrRoute = require('./routes/pasaghyr.route');

mongoose.connect(mongodb_uri)
    .then(() => {
        console.log('Mongo DB connected');
        startScheduleJobs();
    });

const app = express();

app.use(express.static('public'));

// Built-in middleware that parses incoming requests with JSON payloads
app.use(express.json());

// Application-level middleware. Executed every time the app receives a request
app.use((req, res, next) => {
    console.log(`[${new Date().toUTCString()}] ${req.method}: ${req.path}`);
    next();
});

// An endpoint to hadle base url route GET request
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        data: {
            message: "Node.js ExApp"
        }
    })
});

app.use('/pasaghyr', pasaghyrRoute);

// Multer error handler middleware
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            throw createError.BadRequest('File size limit exceeded. Please upload a smaller file.');
        }
    }

    next(err);
});

// Error-handling middleware. Handling global application errors
app.use((err, req, res, next) => {
    const erorrStatus = err.status || 500;
    console.error(`${'\x1b[31m'}[${new Date().toUTCString()}] ${req.method}: ${req.path}. Error(${erorrStatus}): ${err.message}`, '\x1b[0m');
    res.status(erorrStatus).send({
        status: erorrStatus,
        error: err
    });
});

// Starting the application
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
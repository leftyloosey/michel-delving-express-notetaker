const express = require('express');

const notesRouter = require('./notesrouter');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;

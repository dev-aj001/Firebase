const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(bodyParser.json());
app.use('/projects', taskRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).json({ code: 404, message: 'Ruta no encontrada' });
});

module.exports = app;
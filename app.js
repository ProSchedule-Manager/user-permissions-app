const express = require('express');
const bodyParser = require('body-parser');
const { syncDatabase } = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 5433;

app.use(bodyParser.json());
//app.use('/users');

syncDatabase().then(() => {
    app.listen(PORT, ()=> {
        console.log('Servidor está rodando na em http://localhost:${PORT}');
    });
})
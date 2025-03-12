const express = require('express');
const app = express();
const aiRoutes = require('./routes/ai.routes');
const bodyParser = require('body-parser');
const cors = require('cors');




app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser);

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.use('/ai', aiRoutes)


module.exports = app;
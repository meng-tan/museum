const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || '8080';

const config = require('./config/config.js')[env];
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const exhibitionRouter = require('./routes/exhibitionRouter')
const userRouter = require('./routes/userRouter')

mongoose.connect(config.url, { useNewUrlParser: true });

const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/', exhibitionRouter);
app.use('/', userRouter);


app.listen(port, () => console.log(`museum app listening on port ${port}!`))

module.exports = app;
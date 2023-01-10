const express = require('express');
const mongoose = require('mongoose');
// const users = require('./database/users');
require('dotenv').config();

const mainRouter = require('./api/api.router');
const { PORT, MONGO_URL } = require('./configs/variables');

const app = express();

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL)
    .then(()=>console.log('Database is connected'))
    .catch(e=>console.log(e));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter);
app.use('*', notFoundError);
app.use(mainErrorHandler);

app.get('/ping',(req, res) => {res.json('pong')})

app.listen(PORT, () =>{
    console.log('Listen', PORT)
});

app.post('users/:userId', (req, res) =>{
    console.log(req);

    res.json('hello');
})

app.get('users/:userId', (req, res) =>{
    try {
        console.log(req.params);
        const { userId } = req.params;
        const user = users[userId - 1];

        if(!user) {
            res.status(404).json('User not found');
            return;
        }
    res.json(user);
    } catch (e) {
    res.status(400).json(e);
    }
});

app.put('users/:userId', (req, res) =>{
    console.log(req);

    res.json('hello');
});

function notFoundError(req, res, next) {
    res.status(404).json('NOT FOUND')
}

function mainErrorHandler(err, req, res, next) {
    res
        .status(err.status || 500)
        .json({
            message: err.message || 'unknown error'
        })
}
require('dotenv').config();
const configuration = require('./config');  

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

//DB CONNECTION
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

//DB CONNECTION CHECK
database.on('error', (error)=>{
    console.log(error);
})
database.once('connected', () =>{
    console.log('Database Successfully Connected');
})

// USE OF JSON
const app = express();
app.use(express.json());

//USERS ROUTE (PUBLIC)
const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

//MIDDLEWARE
const verifiedToken = (req, res, next) => {   
    try{
        const authorization = req.header('authorization');
        const token = authorization?.split(' ')[1];

        if (!token){
            return res.status(400).json({message: 'Accesss Denied'});
            
        }
        jwt.verify(token || '', configuration.secrets.token);
        next();

    }catch(error){
        return res.status(400).json({message: 'Access Denied'});
    }
};

//TEAMS ROUTE (PRIVATE)
const teamsroutes = require('./routes/teams');
app.use('/api/teams', verifiedToken, teamsroutes);

//PLAYERS ROUTE (PRIVATE)
const playersroutes = require('./routes/players');
app.use('/api/players', verifiedToken, playersroutes); 


app.listen(3000, () =>{
    console.log(`Server successfully started at ${3000} port`)
})




const express = require('express');
const Model = require('../models/users');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const configuration = require('../config');

//GET ALL
router.post('/login', async (req, res) =>{

    const { username, password} = req.body;
    if (!username || !password){
        res.status(400).json({message: 'Invalid username or password'});
    }

    const passwordDB = '$2b$10$luAA/jTLC8LWpsUQbRS17.dDqHWxkNEJa183Nz/xqw6g6YK2Tt7am';
    const validPassword = await bcrypt.compare(password, passwordDB);

    if (!validPassword){
        res.status(400).json({message: 'Invalid username or password'});
    }

    const token = jwt.sign({
        username: 'mondrachen',
        id: 1
    }, configuration.secrets.token);
    res.status(200).json({message: 'Successful login', token,});
})

router.post('/register', async (req, res) =>{
    const {username, password} = req.body;
      
    if (!username || !password){
        res.status(400).json({message: 'Invalid username or password'});
    }
    
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    res.status(200).json({
        message: 'Successful register',
        user: { 
            username: username, 
            id: 1,
            password: passwordHash
        }
    });
})

module.exports = router;


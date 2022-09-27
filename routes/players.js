const express = require('express');
const Model = require('../models/players');
const router = express.Router();

//GET ALL
router.get('/getAll', async (req, res) =>{
    try{
        const data = await Model.find();
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//GET BY ID
router.get('/getBy/:id', async (req, res) =>{
    try{
        const data = await Model.findById(req.params.id);
        res.json(data);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

//CREATE
router.post('/create', async (req, res) =>{
    const data = new Model({
        name: req.body.name,
        lastname: req.body.lastname,
        nationality: req.body.nationality,
        active: req.body.active
    })
    try{
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
    }catch(error){
        res.status(400).json({message: error.message});
    }
})

//UPDATE
router.patch('/update/:id', async (req, res) =>{
    try{
        const id = req.params.id;
        const dataUpdate = req.body;
        const options = { new: true} 

        const result = await Model.findByIdAndUpdate(id, dataUpdate, options);
        res.send(result);
    }catch(error){
        res.status(400).json({message: error.message});
    }
})

//DELETE
router.delete('/delete/:id', async (req, res) =>{
    try{
        await Model.findByIdAndDelete(req.params.id);
        res.send(`Item ${req.params.id} has been deleted`);
    }catch(error){
        res.status(400).json({message: error.message});
    }
})

module.exports = router;
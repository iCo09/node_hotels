const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const{jwtAuthMiddleware, generateToken} = require('./../jwt');

router.post('/signup', async (req,res) => {
    try{
        const data = req.body

        const newPerson = new Person(data);

        const response = await newPerson.save();
        console.log('data saved');


        const payload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payload);

        console.log("Token is: ", token);

        res.status(200).json({response: response, token: token});

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
        
    }
})

//login route
router.post('/login', async(req,res) => {
    try{
        const {username,password} = req.body;
        const user = await Person.findOne({username: username});

        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        //generate tokens
        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload);

        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
        
    }
})


//profile route

router.get('/profile', jwtAuthMiddleware,  async (req,res) => {
    try{
        const userData = req.user;
        console.log(userData);
        const userID = userData.id;
        const user = await Person.findById(userID);

        res.status(200).json({user});
    }catch(err){
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'});
    }
});

router.get('/', async (req, res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

router.get('/:workType', async(req,res) => {
    try{
        const workType = req.params.workType; //extract the work type from the url parameter
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await Person.find({work: workType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(400).json({error: 'Invalid work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({errors : 'Internal Server Error'});
        
    }
})

router.put('/:id', async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //returns updated documents
            runValidators: true, //run mongoose validation
        })

        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }

        console.log('Data Updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const personId = req.params.id;

        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error: 'Person not found'});
        }
        console.log('Data Deleted');
        res.status(200).json({message:"Person deleted Suceessfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Internal Server Error'});
    }
})


module.exports = router;
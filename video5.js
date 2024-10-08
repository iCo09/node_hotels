const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


//Middleware function
const logRequest = (req,res,next) => {
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
}

app.use(logRequest);

app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false})

app.get('/',function(req,res){
    res.send('Welcome to our Hotel')
})

//import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

//use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log('Listening on port 3000')
})
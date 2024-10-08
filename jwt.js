const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next) => {

    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json({error: 'UNAUTHORIZED - TOKEN NOT FOUND'});

    //extract the jwt token from request header
    const token = req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{
        //verify jwt token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        //attach user info to the request object
        req.user = decoded
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error: 'Invalid token'});
    }
}

//to generate token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn:3000});
}

module.exports = {jwtAuthMiddleware, generateToken};
const { isNumber } = require('lodash');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//Define schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['Chef', 'waiter', 'manager'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    //Hashed the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        //hashed password generate
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashed_password = await bcrypt.hash(person.password, salt);

        person.password = hashed_password;

        next();
    }catch(err){
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

const Person = mongoose.model('Person', personSchema);
module.exports = Person;
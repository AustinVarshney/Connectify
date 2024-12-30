require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors'); 
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/user.js');

main()
    .then(() => {
        console.log("DB is Connected!");
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

//Middlewares
function signupValidation(req, res, next){
    const schema = Joi.object({
        fullname: Joi.string().min(3).max(100).required(),
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(4).max(100).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: "Bad request", error});
    }
    next();
}

function loginValidation(req, res, next){
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(4).max(100).required()
    });
    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400).json({message: "Bad request", error});
    }
    next();
}

function ensureAuthenticated(req, res, next){
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({message: "Unauthorized, JWT token is required"});
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(403).json({message: "Unauthorized, JWT token is wrong or expired"});
    }
}

//Routes
app.get("/", ensureAuthenticated, (req, res) => {
    console.log("-----------------Logged in user detail-----------", req.user);
    res.json({message: "Some message is there"});
})

app.post("/signup", signupValidation, async (req, res) => {
    try {
        const {username, fullname, password} = req.body;
        const user = await User.findOne({username});
        if(user){
            return res.status(409).json({message: "User is already exist, you can login."});
        }
        const userModel = new User({fullname, username, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201).json({message: "Signup success", success: true});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Internal Server Error", success: false});
    }
})

app.post("/login", loginValidation, async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});

        if(!user){
            return res.status(403).json({message: "Authentication failed. username or password is wrong.", success: false});
        }
        const isPasswordEqual = await bcrypt.compare(password, user.password);

        if(!isPasswordEqual){
            return res.status(403).json({message: "Authentication failed. username or password is wrong.", success: false});
        }

        const jwtToken = jwt.sign({username: user.username, _id: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});

        res.status(200).json({message: "Login success.", success: true, jwtToken, username, fullname: user.fullname});
    } catch (err) {
        res.status(500).json({message: "Internal Server Error", success: false});
    }
})

let PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`App is listening at port http://localhost:${PORT}`);
})
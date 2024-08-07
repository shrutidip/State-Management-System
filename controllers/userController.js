const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//description: Register a User
//route: POST /api/users/register
//access: Public
const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password: ", hashedPassword);
    const user = await User.create({
        email,
        username,
        password: hashedPassword
    });
    console.log(`User has been created: ${user}`);
    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message: "Register the User"});
});

//description: Login User
//route: POST /api/users/login
//access: Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Please add email and password");
    }
    const user= await User.findOne({email});
    //compare the password with the hashed password in database
    if (user && (await bcrypt.compare(password, user.password))) {
        //Generate JWT
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
        res.status(200).json({accessToken});
    } else {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
});


//description: Current User info
//route: GET /api/users/current
//access: Private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports= {registerUser, loginUser ,currentUser};

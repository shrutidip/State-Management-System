const mongoose= require ("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a name for the user. This field cannot be empty."]
    },
    email: {
        type: String,
        required: [true, "Please provide an email for the user. This field cannot be empty."],
        unique:[true, "Email already exists!"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password for the user. This field cannot be empty."]
    },
},{
    timestamps: true,
});

module.exports= mongoose.model('User', userSchema)
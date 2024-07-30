const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: [true, "Please provide a name for the state. This field cannot be empty."]
    },
    description: {
        type: String,
        required: [true, "Please provide a description for the state. This field cannot be empty."]
    },
    status: {
        type: String,
        required: [true, "Please provide the status of the state. This field cannot be empty."]
    },
    createdBy: {
        type: String,
        required: [true, "Please provide the name of the user who created the state. This field cannot be empty."]
    }
}, {
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

module.exports = mongoose.model('State', stateSchema);
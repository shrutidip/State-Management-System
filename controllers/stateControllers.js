const asyncHandler = require("express-async-handler");
const State = require("../models/stateModel");
const stateModel = require("../models/stateModel");
//description: Get all state
//route: GET /api/state
//access: Private
const getStates = asyncHandler(async (req, res) => {
    const states = await State.find({user_id: req.user.id});
    res.status(200).json(states);
});

//description: Create New state
//route: POST /api/state
//access: Private
const createState = asyncHandler(async (req, res) => {
    console.log("The request body is: ",req.body);
    const { name, description, status, createdBy} = req.body;
    if (!name || !description || !status || !createdBy){
        return res.status(400).json({ error: "All fields are mandatory!" });
    }

    const state = await State.create({ 
        name, 
        description, 
        status, 
        createdBy,
        user_id: req.user.id});
    res.status(201).json(state);
});

//description: Get state
//route: GET /api/state/:id
//access: Private
const getState = asyncHandler(async (req, res) => {
    const state = await State.findById(req.params.id);
    if (!state) {
        return res.status(404).json({ error: "State not found!" });
    }
    res.status(200).json(state);
})

//description: Update state
//route: PUT /api/state/:id
//access: Private
const updateState =  asyncHandler(async (req, res) => {
    const state = await State.findById(req.params.id);
    if (!state) {
        return res.status(404).json({ error: "State not found!" });
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update other state");
    }
    const updateState = await State.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {new: true});
    res.status(200).json(updateState);
})

//description: Delete state
//route: DELETE /api/state/:id
//access: Private
const deleteState = asyncHandler(async (req, res) => {
    const state = await State.findById(req.params.id);
    if (!state) {
        return res.status(404).json({ error: "State not found!" });
    }
    if(contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to delete other state");
    }
    await State.findByIdAndDelete(req.params.id);
    res.status(200).json(state);
})

module.exports ={ getStates , createState, getState, updateState, deleteState };
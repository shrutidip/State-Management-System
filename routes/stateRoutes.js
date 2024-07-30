const express = require("express");
const router = express.Router();
const { getStates , createState, getState, updateState, deleteState } = require("../controllers/stateControllers.js");
const validateToken = require("../middleware/validateTokenHandler.js");
 
router.use(validateToken);
router.route("/").get(getStates).post(createState);
router.route("/:id").get(getState).put(updateState).delete(deleteState);

module.exports = router;
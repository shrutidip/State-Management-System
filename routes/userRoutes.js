const express = require("express"); //  import express module
const { registerUser, loginUser, currentUser } = require("../controllers/userController");
const router = express.Router(); //  create an instance of express router();
const validateToken = require("../middleware/validateTokenHandler");
router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

module.exports = router;

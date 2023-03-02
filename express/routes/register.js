const express = require("express");
const router = express.Router();
const registerController = require("../controllers/registerController");

// This simple statement routes the 'control' for logical statements
// to the /controllers directory where the file /registerController
// has the function 'handleNewUser'
router.post("/", registerController.handleNewUser);

module.exports = router;

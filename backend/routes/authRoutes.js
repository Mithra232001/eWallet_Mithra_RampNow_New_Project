const userController = require("./../controllers/authController");
const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

//routes
router.post('/register', userController.register);
router.post("/login", userController.login);
router.post("/users", authMiddleware.authentication, userController.getUsers);
router.get("/allUsers", userController.getAllUsers);


module.exports = router;
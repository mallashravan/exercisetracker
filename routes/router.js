const express = require('express')

const mongoDAO = require('../db/mongoDAO')

const router = express.Router()

router.post("/new-user",mongoDAO.createUser );

 router.post("/add",mongoDAO.addExercise);
 router.get('/users', mongoDAO.getAllUsers);
 router.get('/log',mongoDAO.getExerciseLog);


module.exports = router
const User = require('../models/user-model');
const mongoose = require('mongoose');

createUser = function (req, res) {
    var payload = req.body;
    console.log(req.body);
    var user = new User(payload);
    user.save(function (err, data) {
        if (err) {
            res.status(500).json("Error in creating a new user");
        }
        var newUser = { username: data.username, _id: data._id };
        res.json(data);
    });
};
addExercise = function (req, res) {
    var payload = req.body;
    console.log(req.body);
    var log = { description: payload.description, duration: payload.duration };
    if (payload.date) {
        log.date = payload.date;
    }
    User.update({ _id: payload.userId }, { $push: { logs: log } }, null, function (err, data) {
        if (err) {
            res.status(500).json("Error in adding exercise.");
        }
        res.json(data);
    });
};
getExerciseLog = function (req, res) {
    console.log(req.query);
    var query = {};
    if (req.query.from) {
        let toDate = req.query.to || new Date();
        console.log("aggrgeate query");
        User.aggregate([
            {
                "$match": {
                    "_id": mongoose.Types.ObjectId(req.query.userId)
                }
            }
            , {
                "$project": {
                    "username": 1, "_id": 1
                    , "logs": {
                        "$filter": {
                            "input": "$logs",
                            "as": "logs",
                            "cond": {
                                "$and": [
                                    { "$gt": ["$$logs.date", new Date(req.query.from)] },
                                    { "$lt": ["$$logs.date", new Date(toDate)] }
                                ]
                            }
                        }
                    }
                }
            }
        ], function (err, data) {
            if (err) {
                res.json(err);
            }
            else
                res.json(data);
        });
    }
    else {
        User.findOne({ _id: req.query.userId }, function (err, data) {
            if (err) {
                res.json({ "error": "invalid URL" });
            }
            res.json(data);
        });
    }

};

getAllUsers = function (req, res) {
    console.log("Request received - Get All Urls");
    User.find({}, 'username _id', (err, data) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
};

module.exports = {
    createUser, getAllUsers, addExercise, getExerciseLog
} 
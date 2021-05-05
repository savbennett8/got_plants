const router = require("express").Router();
const {User, Post, Comment} = require("../../models");

//GET/api/Users
router.get("/", (req, res) => {
    User.findAll({
        attributes:{exclude: ["password"]}
    })
    .then(dbUserData => {
        return res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
});
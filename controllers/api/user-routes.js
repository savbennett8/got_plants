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

//GET/api/Users/:id
router.get("/:id", (req, res) => {
    User.findOne({
        where:{
            id:req.params.id
        },
        attributes:{exclude: ["password"]},
        include:[
            {
                model:Post, 
                attributes:["id", "title", "post_body", "post_url", "created_at"]
            },
            {
               model:Comment,
               attributes:["id", "comment_body", "created_at"],
               include:{
                   model:Post, 
                   attributes:["title"]
               }
            },
        ]
       
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({
                message:"No user found whith this id."
            });
            return;
        }
        return res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
} )
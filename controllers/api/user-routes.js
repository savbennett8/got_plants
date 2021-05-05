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
} );

//POST/api/users/
router.post("/", (req, res) => {
    User.create({
        username: req.body.username, 
        email: req.body.email,
        password: req.body.password,

    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData);
        })
    })
});

//POST/api/users/login
router.post("/login", (req, res) =>{
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({message: "Nosuer withthat email address!"});
            return;
        }

        //Verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }

        req.session.save(() => {
            //declare session variable
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData,message: 'You are now logged in!'});
        });
    });
});

//POST/api/user/logout
router.post("/logout", (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }else{
        res.status(404).end();
    }
});

module.exports = router
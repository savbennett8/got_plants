const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');

// get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'post_body',
            'post_photo',
            'created_at'
        ],
        //ensures latest posted articles appear first
        order: [['created_at', 'DESC']],
        include: [
            //include the Comment model
            {
                model: Comment,
                attributes: [
                    'id',
                    'comment_body',
                    'post_id',
                    'user_id',
                    'created_at'
                ],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => res.json(dbPostData.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get a single post
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'post_body', 'post_photo', 'post_id', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//create a post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        post_body: req.body.post_body,
        post_photo: req.body.post_photo,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//update post
router.put('/:id', (req, res) => {
    Post.update({
        title: req.body.title,
        post_body: req.body.post_body
    }, {
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found' });
            return;
        }
        res.json(dbPostData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
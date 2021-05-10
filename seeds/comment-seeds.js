const { Comment } = require('../models');

const commentData = [{
        comment_body: "1",
        user_id: 1,
        post_id: 1
    },
    {
        comment_body: "2",
        user_id: 2,
        post_id: 2
    },
    {
        comment_body: "3",
        user_id: 4,
        post_id: 3
    },
    {
        comment_body: "4",
        user_id: 3,
        post_id: 4
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
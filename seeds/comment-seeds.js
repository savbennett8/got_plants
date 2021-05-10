const { Comment } = require('../models');

const commentData = [{
    comment_body: "comment 1",
    user_id: 2,
    post_id: 1
},
{
    comment_body: "comment 2",
    user_id: 3,
    post_id: 2
},
{
    comment_body: "comment 3",
    user_id: 4,
    post_id: 3
},
{
    comment_body: "comment 4",
    user_id: 1,
    post_id: 4
}];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;
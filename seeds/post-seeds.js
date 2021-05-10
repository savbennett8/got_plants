const { Post } = require('../models');

const postData = [{
        title: '1.1',
        post_body: '1.11',
        user_id: 1
    },
    {
        title: '2.2',
        post_body: '2.22',
        user_id: 2
    },
    {
        title: "3.3",
        post_body: '3.33',
        user_id: 3
    },
    {
        title: "4.4",
        post_body: "4.44",
        user_id: 4 
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
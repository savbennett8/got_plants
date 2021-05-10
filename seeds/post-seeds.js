const { Post } = require('../models');

const postData = [{
    title: 'Lorem Ipsum',
    post_body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    user_id: 1
},
{
    title: 'Lorem Ipsum 2',
    post_body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    user_id: 2
},
{
    title: "Lorem Ipsum 3",
    post_body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    user_id: 3
},
{
    title: "Lorem Ipsum 4",
    post_body: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    user_id: 1
},
{
    title: "Lorem Ipsum 5",
    post_body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    user_id: 2
},
{
    title: "Lorem Ipsum 6",
    post_body: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',
    user_id: 3
}];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;
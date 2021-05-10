const { User } = require('../models');

const userData = [{
        username: '11111',
        password: '11111'

    },
    {
        username: '22222',
        password: '22222'
    },
    {
        username: '33333',
        password: '33333'
    },
    {
        username: '44444',
        password: '44444'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
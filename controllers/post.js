//not a view route
//crud routes to data base

var express = require('express');
var router = express.Router();
//import data base here


router.get('/', (req, res) => {
    const test = {
        post: ["hello", "test", "hi" ]
    }
console.log('hello')

    //get post from data base
    return res.render('index', test)
});

router.get('/:search', (req, res) => {
    const search = req.params.search
    //search post from data base
    
});

router.post('/', (req, res) => {
    //create post from data base
    
});

router.put('/:id', (req, res) => {
const postId = req.params.id

    //update post from data base
    
});

router.delete('/:id', (req, res) => {
    const postId = req.params.id
    //delet post from data base
    
});

module.exports = router;
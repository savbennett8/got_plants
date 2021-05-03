var express = require('express');
var router = express.Router();
var axios = require('axios');






router.get('/', async (req, res) => {

  const respond = await axios('http://localhost:3001/post')
    .then(post => post.data)
    .catch(err => err);

  let data = {
    content: respond
  }
  res.render('index', data);
});

module.exports = router;
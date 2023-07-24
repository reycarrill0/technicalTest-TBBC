const { Router } = require('express');


const { postCreateAuthor } = require('../controllers/authors.controller');

const router = Router();



router.post('/create', postCreateAuthor
);

module.exports = router;
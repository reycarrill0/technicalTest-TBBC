const { Router } = require('express');



const { getAll, postCreate, PutById } = require('../controllers/contacts.controller');

const router = Router();

router.get('/all', getAll);

router.post('/create', postCreate);

router.put('/Delete/:code', PutById)

module.exports = router;
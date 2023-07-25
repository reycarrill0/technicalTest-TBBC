const { Router } = require('express');



const { getAll, postCreate, PutById, getByCode, getByname, getByauthor} = require('../controllers/contacts.controller');

const router = Router();

router.get('/all', getAll);

router.post('/create', postCreate);

router.put('/Delete/:code', PutById);

router.get('/code/:code', getByCode);

router.get('/name/:name', getByname);

router.get('/autor/:name', getByauthor);

module.exports = router;
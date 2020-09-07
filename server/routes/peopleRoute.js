const express = require('express')

const { PeopleController } = require('../controllers')

const router = express.Router()

router.get('/people/pages', PeopleController.peopleGetByPage);
router.get('/people/all', PeopleController.peopleGetAll);

module.exports = router
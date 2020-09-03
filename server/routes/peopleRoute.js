const express = require('express')

const { PeopleController } = require('../controllers')

const router = express.Router()

router.get('/all', PeopleController.peopleGetAll)

module.exports = router
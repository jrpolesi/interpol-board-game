const express = require('express')
const router = express.Router()
const gameController = require('../controllers/gameController')

router.get('/preferencesAvailable', express.json(), gameController.getPreferencesAvailable.bind(gameController))

module.exports = router
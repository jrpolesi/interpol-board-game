const express = require('express')
const router = express.Router()
const roomsControllers = require('../controllers/roomsController')

router.post('/new', express.json(), roomsControllers.new.bind(roomsControllers))
router.delete('/delete', express.json(), roomsControllers.delete.bind(roomsControllers))
router.use('/:roomId', roomsControllers.hasRoom.bind(roomsControllers))

module.exports = router
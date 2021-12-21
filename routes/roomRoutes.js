const express = require('express')
const router = express.Router()
const roomsControllers = require('../controllers/roomsController')

router.post('/new', express.json(), roomsControllers.newRoom.bind(roomsControllers))
router.delete('/delete', express.json(), roomsControllers.deleteRoom.bind(roomsControllers))
// router.use('/:idRoom', (req, res) => {
//   console.log(req.params.idRoom)
//   res.sendStatus(200)
// })

module.exports = router
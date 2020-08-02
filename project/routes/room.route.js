const router = require('express').Router();

const roomController = require('../controllers/room.controller');

router.get('/room/:id', roomController.getRoom);

router.get('/:id', roomController.getRoomById);

module.exports = router;

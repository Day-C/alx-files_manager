const express = require('express');
const router = express.Router();
const AppController = require('../controllers/appController');


router.get('/status', AppController.getStatus);

router.get('/stats', AppController.getStats);


module.exports = router;
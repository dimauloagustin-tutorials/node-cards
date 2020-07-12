const express = require('express');
const homeController = require('../controllers/home');
const router = express.Router();

router.get('/', homeController.getCards);

router.post('/change-fab-state', homeController.changeFavState);

module.exports = router;
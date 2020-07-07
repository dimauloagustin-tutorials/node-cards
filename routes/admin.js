const express = require('express');
const adminController = require('../controllers/admin');
const router = express.Router();

router.get('/add-ticket', adminController.getCreateTicket);
router.post('/add-ticket', adminController.postCreateTicket);

module.exports = router;
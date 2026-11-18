const express = require('express');
const lookmanAiController = require('../controllers/lookmanAiController');

const router = express.Router();

router.get('/health', lookmanAiController.getHealth);
router.get('/models', lookmanAiController.getModels);
router.post('/chat/stream', lookmanAiController.streamChat);
router.post('/tools/calculate-storage', lookmanAiController.calculateStorage);
router.post('/tools/calculate-dori', lookmanAiController.calculateDori);

module.exports = router;

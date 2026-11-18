const express = require('express');
const inquiryController = require('../controllers/inquiryController');

const router = express.Router();

router.get('/', inquiryController.getInquiries);
router.post('/', inquiryController.createInquiry);
router.delete('/:id', inquiryController.deleteInquiry);
router.delete('/', inquiryController.bulkDeleteInquiries);

module.exports = router;

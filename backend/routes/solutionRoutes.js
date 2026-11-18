const express = require('express');
const solutionController = require('../controllers/solutionController');

const router = express.Router();

router.get('/', solutionController.getSolutions);
router.post('/', solutionController.createSolution);
router.put('/:id', solutionController.updateSolution);
router.delete('/:id', solutionController.deleteSolution);

module.exports = router;

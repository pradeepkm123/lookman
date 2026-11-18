const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/datasheet-download', productController.downloadDatasheetRedirect);
router.get('/:id/datasheet', productController.downloadProductDatasheetPdf);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.post('/bulk', productController.bulkImportProducts);
router.put('/:id', productController.updateProduct);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;

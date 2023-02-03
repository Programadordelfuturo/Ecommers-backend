const { Router } = require('express');
const {
  getAllProducts,
  createProduct
} = require('../controllers/products.controller'); 
const userExtractor = require('../middlewares/userExtractor.middleware');

const router = Router();

router.get('/', getAllProducts);
router.post('/', userExtractor, createProduct);

module.exports = router;

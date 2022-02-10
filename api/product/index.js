const { Router } = require('express');
const { 
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./product.controller')

const router = Router()

//CRUD
router.get('/', getAllProducts)
router.get('/:id', getProductById)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)


module.exports = router
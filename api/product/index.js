const { Router } = require('express');
const { isAuthenticated, hasRole } = require('../../auth/auth.services');
const { 
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./product.controller')

const router = Router()
const { ProductSchema, ParamsNewUpdate } = require('./product.schema')
const validateRequest = require('../../middleware/validateRequest')

//CRUD

/***
 * @openapi
 * /api/products:
 *  get:
 *    tags:
 *    - Products
 *    summary: List Product
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Get all products
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  example: error de llamado a db
 *      401:
 *        description: Unauthorized userr, necesita token valido
 */

router.get('/', isAuthenticated(), getAllProducts)


router.get('/:id', validateRequest(ProductSchema, 'params'), getProductById)

/***
 * @openapi
 * /api/products:
 *  post:
 *    tags:
 *    - Products
 *    summary: Create a new product
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *    responses:
 *      200:
 *        description: Created a new nonte
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Product'
 *      400:
 *        description: Bad request
 *
 */
router.post('/', hasRole(['Developer', 'Admin']),  validateRequest(ProductSchema, 'body'), createProduct)
router.put('/:id', validateRequest(ProductSchema, 'params'), validateRequest(ProductSchema, 'body'), updateProduct)
router.put('/:id/:name', validateRequest(ParamsNewUpdate, 'params'), validateRequest(ProductSchema, 'body'), updateProduct)
router.delete('/:id', hasRole('Developer'), deleteProduct)


module.exports = router
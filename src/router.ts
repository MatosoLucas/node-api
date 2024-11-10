import { Router } from 'express'
import { body } from 'express-validator'
import { handleInputErrors } from './modules/middleware'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from './handlers/product'
import { createUpdate, deleteUpdate, getUpdateById, getUpdates, updateUpdate } from './handlers/update'
const router = Router()

/**
 * Product
 */

router.get('/product', getProducts)
router.get('/product/:id', getProduct)
router.put('/product/:id',
  body('name').isString(),
  handleInputErrors,
  updateProduct
)
router.post('/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
)
router.delete('/product/:id', deleteProduct)


/**
 * Update
 */

router.get('/update', getUpdates)
router.get('/update/:id', getUpdateById)
router.put('/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
  body('version').optional(),
  updateUpdate
)
router.post('/update',
  body('title').exists(),
  body('productId').exists(),
  body('body').exists().isString(),
  body('version').optional(),
  createUpdate
)
router.delete('/update/:id', deleteUpdate)

/**
 * Update Point
 */

router.get('/updatepoint', () => { })
router.get('/updatepoint/:id', () => { })
router.put('/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => { })
router.post('/updatepoint/',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => { }
)
router.delete('/updatepoint/:id', () => { })

router.use((err, req, res, next) => {
  console.log(err)
  if (err.type === 'auth') {
    res.status(401).json({ message: 'Unauthorized' })
  } else if (err.type === 'input') {
    res.status(400).json({ message: 'Invalid Input' })
  } else {
    res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default router
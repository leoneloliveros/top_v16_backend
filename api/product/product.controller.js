const Product = require('./product.model')

async function getAllProducts(req, res) {
  const { status } = req.query
  try {
    // con los usuarios
    const product = await Product.find({ status }) 
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function getProductById(req, res) {
  const { id } = req.params
  try {
    const product = await Product.findById(id) 
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function createProduct(req, res) {
  const info = req.body;
  try {
    const product = await Product.create(info)
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  } 
}

async function updateProduct(req, res) {
  const { id } = req.params
  const info = req.body;
  try {
    const product = await Product.findByIdAndUpdate(id, info, { new: true })
    res.status(200).json(product)
  } catch(err) {
    console.log(err)
    res.status(400).json({ error: err})
  }
}

async function deleteProduct(req, res) {
  const { id } = req.params
  try {
    const product = await Product.findByIdAndDelete(id)
    res.status(200).json({ message: 'Product deleted succesfully', product })
  } catch(error) {
    res.status(500).json({ error })
  }
}


module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
}
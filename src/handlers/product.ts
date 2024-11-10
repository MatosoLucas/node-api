import prisma from '../db'


//Get all products
export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id
    }
  })

  res.json({ data: products })
}

//Get a single product
export const getProduct = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  })

  res.json({ data: product })
}

export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id
      }
    })

    res.json({ data: product })
  } catch (e) {
    next(e)
  }
}

export const updateProduct = async (req, res) => {
  const updatedProduct = await prisma.product.update({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    },
    data: {
      name: req.body.name
    }
  })

  res.json({ data: updatedProduct })
}

export const deleteProduct = async (req, res) => {
  const deletedProduct = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id
    }
  })

  res.json({ data: deletedProduct })
}
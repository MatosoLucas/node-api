import prisma from "../db"

export const getUpdates = async (req, res) => {
  const updates = await prisma.update.findMany({
    where: {
      product: {
        belongsToId: req.user.id
      }
    }
  })

  res.json({ data: updates })
}

export const getUpdateById = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id
    }
  })

  res.json({ data: update })
}

export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
      belongsToId: req.user.id
    }
  })

  if (!product) {
    res.json({ message: 'This product does not belong to you' })
  }

  const update = await prisma.update.create({
    data: {
      ...req.body,
    }
  })

  res.json({ data: update })
}

export const updateUpdate = async (req, res) => {
  let update = await prisma.update.findUnique({
    where: {
      id: req.params.id
    }
  })

  if (!update) {
    res.json({ message: 'Update not found' })
  }

  update = await prisma.update.update({
    where: {
      id: req.params.id
    },
    data: req.body
  })

  res.json({ data: update })
}

export const deleteUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id
    }
  })

  if (!update) {
    res.json({ message: 'Update not found' })
  }

  const deletedUpdate = await prisma.update.delete({
    where: {
      id: req.params.id
    }
  })

  res.json({ data: deletedUpdate })
}
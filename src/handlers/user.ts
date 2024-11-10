import prisma from '../db'
import { comparePasswords, createJWT, hashPassword, } from '../modules/auth'


export const createNewUser = async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: await hashPassword(password)
      }
    })

    const token = createJWT(user)

    res.json({ token })

  } catch (e) {
    e.type = 'input'
    next(e)
  }
}



export const signIn = async (req, res) => {
  console.log(req.body, 'TESTE')
  if (!req.body.username || !req.body.password) {
    res.status(400)
    res.json({ message: 'Invalid Input' })
    return
  }
  const { username, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  const isValid = await comparePasswords(password, user.password)

  if (!isValid) {
    res.status(401)
    res.json({ message: 'Invalid password' })
    return
  }

  const token = createJWT(user)
  return res.json({ token })
}
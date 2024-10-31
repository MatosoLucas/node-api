import prisma from '../db'
import { comparePasswords, createJWT, hashPassword, } from '../modules/auth'


export const createNewUser = async (req, res) => {
  const { username, password } = req.body

  const user = await prisma.user.create({
    data: {
      username,
      password: await hashPassword(password)
    }
  })

  const token = createJWT(user)

  res.json({ token })
}

export const signIn = async (req, res) => {
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
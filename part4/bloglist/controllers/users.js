import express from 'express'
import User from '../models/user.js'
import { hash_password } from '../utils/hash.js'

const usersRouter = express.Router()

const validate_password_format = password => {
  return password && password.length >= 3
}

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!validate_password_format(password)) {
    return response.status(400).json({ error: 'password must be atleast 3 characters' })
  }

  const passwordHash = await hash_password(password)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  response.json(users)
})

export default usersRouter

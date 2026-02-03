import express from 'express'
import User from '../models/user.js'
import { compare_password, create_token } from '../utils/hash.js'

const loginRouter = express.Router()

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await compare_password(password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  response.status(200).json({
    token: create_token(userForToken),
    username: user.username,
    name: user.name
  })
})
  
export default loginRouter

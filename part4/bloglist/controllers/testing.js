import express from 'express'
import User from '../models/user.js'
import Blog from '../models/blog.js'

const router = express.Router()

router.post('/reset', async (_request, response) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  response.status(204).end()
})

export default router

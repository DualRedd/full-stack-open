import express from 'express'
import { userExtractor } from '../utils/middleware.js'
import Blog from '../models/blog.js'

const blogsRouter = express.Router()

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: request.user._id
  })
  
  const result = await blog.save()
  request.user.blogs = request.user.blogs.concat(result._id)
  await request.user.save()

  const populatedResult = await result.populate('user', { username: 1, name: 1 })
  response.status(201).json(populatedResult)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  if ( blog.user.toString() !== request.user._id.toString() ) {
    return response.status(401).json({ error: 'only the creator can delete a blog' })
  }

  await blog.deleteOne()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate( 
    request.params.id,
    newBlog,
    { new: true, runValidators: true }
  )

  if (!updatedBlog) {
    return response.status(404).end()
  }

  response.json(updatedBlog)
})

export default blogsRouter

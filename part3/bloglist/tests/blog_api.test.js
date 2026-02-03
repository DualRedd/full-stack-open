import assert from 'node:assert'
import { test, describe, beforeEach, after } from 'node:test'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import Blog from '../models/blog.js'
import blogHelper from './blog_helper.js'

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogHelper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, blogHelper.initialBlogs.length)
})

test('identifier is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert.notStrictEqual(blog.id, undefined)
    assert.strictEqual(blog._id, undefined)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "New blog for testing",
    author: "Test Author",
    url: "http://testblog.com",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const currentBlogs = await blogHelper.getAllBlogs()
  assert.strictEqual(currentBlogs.length, blogHelper.initialBlogs.length + 1)

  const addedBlog = currentBlogs.find(b => b.title === 'New blog for testing')
  assert.strictEqual(addedBlog.title, 'New blog for testing')
  assert.strictEqual(addedBlog.author, 'Test Author')
  assert.strictEqual(addedBlog.url, 'http://testblog.com')
  assert.strictEqual(addedBlog.likes, 10)
})

test('if likes property is missing, it defaults to 0', async () => {
  const newBlog = {
    title: "Blog without likes",
    author: "No Likes Author",
    url: "http://nolikesblog.com"
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('missing title results in 400 Bad Request', async () => {
  const blogWithoutTitle = {
    author: "No Title Author",
    url: "http://notitle.com",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutTitle)
    .expect(400)
})

test('missing url results in 400 Bad Request', async () => {
  const blogWithoutUrl = {
    title: "Blog without URL",
    author: "No Likes Author",
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(blogWithoutUrl)
    .expect(400)
})

after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})

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

describe('when there are blogs saved', () => {
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

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
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

    test('defaults likes to 0 if missing', async () => {
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

    test('with missing title results in 400 Bad Request', async () => {
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

    test('with missing url results in 400 Bad Request', async () => {
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

  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await blogHelper.getAllBlogs()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await blogHelper.getAllBlogs()
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
      assert.strictEqual(blogsAtEnd.map(b => b.id).includes(blogToDelete.id), false)
    })
  })

  describe('updating a blog', () => {
    test('succeeds in updating likes of a blog', async () => {
      const blogsAtStart = await blogHelper.getAllBlogs()
      const blogToUpdate = blogsAtStart[0]

      const updatedBlog = {
        ...blogToUpdate,
        likes: blogToUpdate.likes + 1
      }

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.deepStrictEqual(response.body, updatedBlog)
    })

    test('fails with status code 404 if blog does not exist', async () => {
      const nonExistingId = await blogHelper.getNonExistingId()
      const updatedBlog = {
        title: "Non-existing blog",
        author: "No One",
        url: "http://noone.com",
        likes: 0
      }

      await api
        .put(`/api/blogs/${nonExistingId}`)
        .send(updatedBlog)
        .expect(404)
    })
  })

})

after(async () => {
  await Blog.deleteMany({})
  await mongoose.connection.close()
})

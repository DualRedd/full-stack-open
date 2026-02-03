import assert from 'node:assert'
import { test, describe, beforeEach, after } from 'node:test'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../app.js'
import User from '../models/user.js'
import userHelper from './user_helper.js'
import { hash_password } from '../utils/hash.js'

const api = supertest(app)

describe('when there is initially some users saved', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await Promise.all(userHelper.initialUsers.map(async (user) => {
      const passwordHash = await hash_password(user.password)
      const userObject = new User({...user, passwordHash})
      await userObject.save()
    }))
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, userHelper.initialUsers.length)
  })

  test('password hash is not returned', async () => {
    const response = await api.get('/api/users')
    response.body.forEach(user => {
      assert.strictEqual(user.passwordHash, undefined)
    })
  })

  test('identifier is named id', async () => {
    const response = await api.get('/api/users')
    response.body.forEach(user => {
      assert.notStrictEqual(user.id, undefined)
      assert.strictEqual(user._id, undefined)
    })
  })

  describe('addition of a new user', () => {
    test('succeeds with valid data', async () => {
      const newUser = {
        username: "newuser",
        name: "New User",
        password: "newpassword"
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const currentUsers = await userHelper.getAllUsers()
      assert.strictEqual(currentUsers.length, userHelper.initialUsers.length + 1)

      const addedUser = currentUsers.find(u => u.username === 'newuser')
      assert.strictEqual(addedUser.name, 'New User')
    })

    test('with short password results in 400 Bad Request', async () => {
      const newUser = {
        username: "shortpassuser",
        name: "Short Pass User",
        password: "pw"
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert.strictEqual(response.body.error, 'password must be atleast 3 characters')
    })

    test('with missing password results in 400 Bad Request', async () => {
      const newUser = {
        username: "nopassuser",
        name: "No Pass User"
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })

    test('with short username results in 400 Bad Request', async () => {
      const newUser = {
        username: "ab",
        name: "Short Username User",
        password: "validpassword"
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
      
      assert.strictEqual(response.body.error.includes('is shorter than the minimum allowed length'), true)
    })

    test('with missing username results in 400 Bad Request', async () => {
      const newUser = {
        name: "No Username User",
        password: "validpassword"
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
    })

    test('with non-unique username results in 400 Bad Request', async () => {
      const newUser = {
        username: userHelper.initialUsers[0].username,
        name: "Duplicate Username User",
        password: "validpassword"
      }

      const response = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert.strictEqual(response.body.error.includes('expected `username` to be unique'), true)
    })

  })

})

after(async () => {
  await mongoose.connection.close()
})

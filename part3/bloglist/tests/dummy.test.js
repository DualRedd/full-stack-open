import { test, describe } from 'node:test'
import assert from 'node:assert'
import listHelper from '../utils/list_helper.js'

const singleBlog = [
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 7,
    __v: 0
  }
]

const multipleBlogs = [
  ...singleBlog,
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 11,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of single blog equals likes of that', () => {
    assert.strictEqual(listHelper.totalLikes(singleBlog), 7)
  })

  test('of a list with multiple blogs', () => {
    assert.strictEqual(listHelper.totalLikes(multipleBlogs), 25)
  })
})

describe('favorite blog', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('of single blog is that blog', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(singleBlog), singleBlog[0])
  })

  test('of a list with multiple blogs', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(multipleBlogs), multipleBlogs[2])
  })
})

describe('most blogs', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostBlogs([]), null)
  })

  test('of single blog is the author of that blog with count 1', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(singleBlog), { author: "Robert C. Martin", blogs: 1 })
  })

  test('of a list with multiple blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(multipleBlogs), { author: "Robert C. Martin", blogs: 2 })
  })
})

describe('most likes', () => {
  test('of empty list is null', () => {
    assert.strictEqual(listHelper.mostLikes([]), null)
  })

  test('of single blog is the author of that blog with likes of that blog', () => {
    assert.deepStrictEqual(listHelper.mostLikes(singleBlog), { author: "Robert C. Martin", likes: 7 })
  })

  test('of a list with multiple blogs', () => {
    assert.deepStrictEqual(listHelper.mostLikes(multipleBlogs), { author: "Edsger W. Dijkstra", likes: 11 })
  })
})

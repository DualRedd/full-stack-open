import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (title, author, url) => {
  const newBlog = {
    title: title,
    author: author,
    url: url
  }
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: getToken() },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const like = async (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  const config = {
    headers: { Authorization: getToken() },
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, updatedBlog, config)
  return response.data
}

export default { getAll, create, remove, like }

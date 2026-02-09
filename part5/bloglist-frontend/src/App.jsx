import { useState, useEffect } from 'react'
import { setToken } from './services/auth'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglistLoggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleCreateBlog = (title, author, url) => {
    blogService.create(title, author, url)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setSuccess(`a new blog "${title}" by ${author} added`)
        setTimeout(() => {
          setSuccess(null)
        }, 5000)
      })
      .catch(() => {
        setError('creating a new blog failed')
        setTimeout(() => {
          setError(null)
        }, 5000)
      })
  }

  return (
    <>
      <Notification message={error} type="error" />
      <Notification message={success} type="success" />
      {!user ? (
        <LoginForm setUser={setUser} setError={setError} setSuccess={setSuccess} />
      ) : (
        <>
          <h2>Blogs</h2>
          <p>Logged in as {user.name} <LogoutButton setUser={setUser} setSuccess={setSuccess} /></p>
          <BlogList blogs={blogs} />
          <NewBlogForm handleCreate={handleCreateBlog} />
        </>
      )}
    </>
  )
}

export default App
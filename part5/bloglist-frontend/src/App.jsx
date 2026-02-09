import { useState, useRef, useEffect } from 'react'
import { setToken } from './services/auth'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [blogs, setBlogs] = useState([])
  const noteFormRef = useRef()

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
        noteFormRef.current.toggleVisibility()
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

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.like(blog)
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? { ...b, likes: updatedBlog.likes } : b))
    } catch {
      setError('liking the blog failed')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(b => b.id !== blog.id))
      setSuccess(`blog "${blog.title}" by ${blog.author} removed`)
      setTimeout(() => {
        setSuccess(null)
      }, 5000)
    } catch {
      setError('deleting the blog failed')
      setTimeout(() => {
        setError(null)
      }, 5000)
    }
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

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
          <BlogList blogs={sortedBlogs} handleLike={handleLike} handleDelete={handleDelete} currentUser={user} />
          <Togglable buttonLabel="new blog" ref={noteFormRef}>
            <NewBlogForm handleCreate={handleCreateBlog} />
          </Togglable>
        </>
      )}
    </>
  )
}

export default App
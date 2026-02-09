import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, currentUser }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible)
  }

  const onLike = () => {
    handleLike(blog)
  }

  const onDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const rowStyle = {
    margin: 0
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author}
      <button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
      {detailsVisible && (
        <div>
          <p style={rowStyle}>Url: {blog.url}</p>
          <p style={rowStyle}>Likes: {blog.likes} <button onClick={onLike}>like</button></p>
          <p style={rowStyle}>By: {blog.user.name}</p>

          {currentUser && currentUser.username === blog.user.username && (
            <button onClick={onDelete}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
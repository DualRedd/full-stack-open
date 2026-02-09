import Blog from './Blog'

const BlogList = ({ blogs, handleLike, handleDelete, currentUser }) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} currentUser={currentUser} />
      )}
    </div>
  )
}

export default BlogList

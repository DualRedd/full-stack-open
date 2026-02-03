const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => (blog.likes > fav.likes ? blog : fav), blogs[0] || null)
}

const mostBlogs = (blogs) => {
  const authorCount = {}

  blogs.forEach(blog => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })

  let maxBlogs = 0
  let mostBlogsAuthor = null

  for (const author in authorCount) {
    if (authorCount[author] > maxBlogs) {
      maxBlogs = authorCount[author]
      mostBlogsAuthor = author
    }
  }

  return mostBlogsAuthor ? { author: mostBlogsAuthor, blogs: maxBlogs } : null
}

const mostLikes = (blogs) => {
  const authorLikes = {}

  blogs.forEach(blog => {
    authorLikes[blog.author] = (authorLikes[blog.author] || 0) + blog.likes
  })

  let maxLikes = 0
  let mostLikesAuthor = null

  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      maxLikes = authorLikes[author]
      mostLikesAuthor = author
    }
  }

  return mostLikesAuthor ? { author: mostLikesAuthor, likes: maxLikes } : null
}

export default { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
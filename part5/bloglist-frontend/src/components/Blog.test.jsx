import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'


const blog = {
  title: 'Test Blog',
  author: 'anyone',
  url: 'http://example.com',
  likes: 0,
  user: {
    name: 'Test User',
    username: 'testuser'
  }
}


test('renders content', () => {
  render(<Blog blog={blog} />)
  const element = screen.getByText('Test Blog', { exact: false })
  expect(element).toBeDefined()
})

test('details buttons shows url and likes', async () => {
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const urlElement = screen.getByText('http://example.com', { exact: false })
  const likesElement = screen.getByText('Likes: 0')

  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
  expect()
})

test('like button calls event handler twice when clicked twice', async () => {
  const mockHandler = vi.fn()

  render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

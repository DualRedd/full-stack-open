import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import userEvent from '@testing-library/user-event'
import NewBlogForm from './NewBlogForm'


test('create event handler is called with right details when a new blog is created', async () => {
  const mockHandler = vi.fn()

  render(<NewBlogForm handleCreate={mockHandler} />)

  const user = userEvent.setup()
  const titleInput = screen.getByPlaceholderText('Title')
  const authorInput = screen.getByPlaceholderText('Author')
  const urlInput = screen.getByPlaceholderText('URL')
  const createButton = screen.getByText('create')

  await user.type(titleInput, 'Test Blog Title')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://example.com/test-blog')
  await user.click(createButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('Test Blog Title')
  expect(mockHandler.mock.calls[0][1]).toBe('Test Author')
  expect(mockHandler.mock.calls[0][2]).toBe('http://example.com/test-blog')
})

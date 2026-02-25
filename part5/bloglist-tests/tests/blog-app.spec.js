import { test, expect } from '@playwright/test';
import { login, logout, createBlog, toggleBlogDetails, likeBlog, deleteBlog, resetDatabase, createUser } from './helper';

test.describe('Blog app', () => {
  test.beforeEach(async ({ page }) => {
    await resetDatabase(page)
    await createUser(page)
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  test.describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page)
      await expect(page.getByText('Logged in as tester')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'tester', 'wrongpassword')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })

  test.describe('When logged in', () => {
    test.beforeEach(async ({ page }) => {
      await login(page)
      await expect(page.getByText('Logged in as tester')).toBeVisible()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Test blog J', 'John Doe', 'https://test.com')
      await expect(page.getByText('Test blog J by John Doe')).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'Test blog')
      await toggleBlogDetails(page, 'Test blog')
      await likeBlog(page, 'Test blog')
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('blog can be deleted', async ({ page }) => {
      await createBlog(page, 'Test blog D', 'John Doe', 'https://test.com')
      await toggleBlogDetails(page, 'Test blog D', 'John Doe')
      await deleteBlog(page, 'Test blog D', 'John Doe')
      await expect(page.getByText('Test blog D by John Doe')).not.toBeVisible()
    })

    test('another user does not see delete button', async ({ page }) => {
      await createBlog(page, 'Test blog D', 'John Doe', 'https://test.com')
      await logout(page)
      await createUser(page, 'anotheruser', 'Another User', 'anotherpassword')
      await login(page, 'anotheruser', 'anotherpassword')
      await expect(page.getByText('Test blog D by John Doe')).toBeVisible()
      await toggleBlogDetails(page, 'Test blog D', 'John Doe')
      await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
    })

    test('blogs are ordered by likes', async ({ page }) => {
      const likes = [2, 4, 1, 3]
      for (let i = 0; i < likes.length; i++) {
        await createBlog(page, 'Test blog ' + (i + 1), 'John Doe', 'https://test.com')
        await toggleBlogDetails(page, 'Test blog ' + (i + 1), 'John Doe')
        await likeBlog(page, 'Test blog ' + (i + 1), 'John Doe', likes[i])
        await toggleBlogDetails(page, 'Test blog ' + (i + 1), 'John Doe')
      }
      const blogItems = page.getByText(/Test blog \d+ by John Doe/)
      await expect(blogItems.first()).toHaveText(/Test blog 2 by John Doe/)
      await expect(blogItems.nth(1)).toHaveText(/Test blog 4 by John Doe/)
      await expect(blogItems.nth(2)).toHaveText(/Test blog 1 by John Doe/)
      await expect(blogItems.nth(3)).toHaveText(/Test blog 3 by John Doe/)
    })
  })

})

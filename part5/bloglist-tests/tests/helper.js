import { expect } from '@playwright/test';

export async function resetDatabase(page) {
  const resetResponse = await page.request.post('/api/testing/reset')
  expect(resetResponse.status()).toBe(204)
}

export async function createUser(page, username = 'tester', name = 'tester', password = 'testerpassword') {
  const createUserResponse = await page.request.post('/api/users', {
    data: { username, name, password }
  })
  expect(createUserResponse.status()).toBe(201)
}

export async function login(page, username = 'tester', password = 'testerpassword') {
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

export async function logout(page) {
  await page.getByRole('button', { name: 'logout' }).click()
}

export async function toggleBlogDetails(page, title, author = 'Test author') {
  const button = page
    .getByText(title + " by " + author)
    .getByRole('button', { name: /view|hide/ })
  await button.click()
}

export async function createBlog(page, title, author = 'Test author', url = 'https://test.com') {
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByText("create new").waitFor()
  await page.getByRole('textbox', { name: 'Title' }).fill(title)
  await page.getByRole('textbox', { name: 'Author' }).fill(author)
  await page.getByRole('textbox', { name: 'Url' }).fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(title + " by " + author).waitFor()
}

export async function likeBlog(page, title, author = 'Test author', times = 1) {
  const likeButton = page.getByText(title + " by " + author).getByRole('button', { name: 'like' })
  for (let i = 0; i < times; i++) {
    await likeButton.click()
  }
}

export async function deleteBlog(page, title, author = 'Test author') {
  page.once('dialog', async (dialog) => {
    await dialog.accept()
  })
  await page.getByText(title + " by " + author).getByRole('button', { name: 'delete' }).click()
}
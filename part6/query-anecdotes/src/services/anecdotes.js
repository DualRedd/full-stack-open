const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error('Failed to fetch anecdotes')
  }

  return await response.json()
}

const create = async (content) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, votes: 0 }),
  })

  const body = await response.json()
  
  if (!response.ok) {
    throw new Error(body.error || 'Failed to create anecdote')
  }

  return body
}

const update = async (newAnecdote) => {
  const response = await fetch(`${baseUrl}/${newAnecdote.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAnecdote),
  })

  if (!response.ok) {
    throw new Error('Failed to update anecdote')
  }

  return await response.json()
}

export default { getAll, create, update }
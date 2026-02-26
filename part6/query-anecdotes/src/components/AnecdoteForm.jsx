import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from '../services/anecdotes'
import NotificationContext from '../context/NotificationContext'

const AnecdoteForm = () => {
  const { setNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      setNotification(`new anecdote '${content}' created`)
    },
    onError: (error) => {
      setNotification(error.message)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdoteMutation.mutate(content)
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

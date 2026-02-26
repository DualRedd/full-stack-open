import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import anecdotesService from './services/anecdotes'
import NotificationContext from './context/NotificationContext'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const { setNotification } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  
  const updateAnecdoteMutation = useMutation({
    mutationFn: anecdotesService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    setNotification(`voted for anecdote '${anecdote.content}'`)
  }

  const anecdotes = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdotesService.getAll,
    retry: 1,
  })

  if (anecdotes.isLoading) {
    return <div>Loading...</div>
  }

  if (anecdotes.isError) {
    return <div>anecdote service is not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App

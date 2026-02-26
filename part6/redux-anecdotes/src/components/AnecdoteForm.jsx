import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreate = event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ''
    dispatch(setNotification(`You created a new anecdote: '${anecdote}'`))
  }

  return (
    <>
    <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
    </>
  )
};

export default AnecdoteForm

import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const selectAnecdotes = createSelector(
  (state) => state.anecdotes,
  (state) => state.filter,
  (anecdotes, filter) => {
    return [...anecdotes]
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  }
)

const AnecdoteList = () => {
  const anecdotes = useSelector(selectAnecdotes)
  const dispatch = useDispatch()

  const handleVote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 3))
  }

  return (
    <>
    {anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ))}
    </>
  )
}

export default AnecdoteList

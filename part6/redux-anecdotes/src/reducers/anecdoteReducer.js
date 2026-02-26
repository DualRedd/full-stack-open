import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const initialState = ''

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes: (_state, action) => action.payload,
    addAnecdote: (state, action) => state.concat(action.payload),
    updateAnecdote: (state, action) => {
      return state.map(anecdote => {
        if (anecdote.id === action.payload.id) {
          return action.payload
        }
        return anecdote
      })
    },
  }
})

const { setAnecdotes, addAnecdote, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.vote(anecdote)
    dispatch(updateAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer

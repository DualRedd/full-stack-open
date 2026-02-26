import { configureStore  } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'
import notificationMiddleware from './middleware/notificationMiddleware'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    anecdotes: anecdoteReducer,
    filter: filterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(notificationMiddleware)
})

export default store

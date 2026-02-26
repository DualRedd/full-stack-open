import { setNotification, clearNotification } from '../reducers/notificationReducer'

const notificationMiddleware = store => next => {
  let timeoutId = null
  return action => {
    const result = next(action)
  
    if (action.type === setNotification.type) {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        store.dispatch(clearNotification())
        timeoutId = null
      }, 5000)
    }
  
    return result
  }
}

export default notificationMiddleware

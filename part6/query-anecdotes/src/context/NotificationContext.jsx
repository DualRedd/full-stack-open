import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.payload
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  let timeoutId = null

  const setNotification = (notification) => {
    if (timeoutId) clearTimeout(timeoutId)
      notificationDispatch({ type: 'SET_NOTIFICATION', payload: notification })
    timeoutId = setTimeout(() => {
      notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      timeoutId = null
    }, 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext

import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationAction: (_state, action) => action.payload,
    clearNotificationAction: (_state, _action) => ''
  }
})

const { setNotificationAction, clearNotificationAction } = notificationSlice.actions

let timeoutId = null

export const setNotification = (message, timeout = 5) => {
  console.log('setNotification', message, timeout)
  return (dispatch) => {
    if (timeoutId) clearTimeout(timeoutId)
    dispatch(setNotificationAction(message))
    timeoutId = setTimeout(() => {
      dispatch(clearNotificationAction())
      timeoutId = null
    }, timeout * 1000)
  }
}

export default notificationSlice.reducer

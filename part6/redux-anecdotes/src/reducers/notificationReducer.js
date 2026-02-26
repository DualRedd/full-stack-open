import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (_state, action) => action.payload,
    clearNotification: (_state, _action) => ''
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

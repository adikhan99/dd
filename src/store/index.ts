// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from '@components/appChatSlice'
import user from 'src/store/apps/user'
import auth from 'src/store/apps/auth'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import modal from 'src/store/apps/modal'

export const store = configureStore({
  reducer: {
    auth,
    user,
    chat,
    email,
    invoice,
    calendar,
    modal
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = any

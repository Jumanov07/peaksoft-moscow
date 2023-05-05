import { configureStore } from '@reduxjs/toolkit'
import { generalSlice } from './generalSlice'

export const store = configureStore({
   reducer: {
      general: generalSlice.reducer,
   },
})

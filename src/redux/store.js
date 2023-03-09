import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import firstTimeReducer from './slices/firstTimeSlice'
import accountReducer from './slices/accountSlice'
import drawerReducer from './slices/drawerSlice'
import paymentsReducer from './slices/paymentsSlice'
import windowReducer from './slices/windowSlice'

export default configureStore({
  reducer: {
    authState: authReducer,
    firstTimeState:firstTimeReducer,
    accountState:accountReducer,
    drawerState:drawerReducer,
    paymentsState:paymentsReducer,
    windowState:windowReducer,
  },
})
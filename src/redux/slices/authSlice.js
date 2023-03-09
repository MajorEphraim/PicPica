import { createSlice } from '@reduxjs/toolkit'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isLoggedIn:false,
  isLoading:true,
  token:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeToken: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
    //  try {
    //    await AsyncStorage.setItem('token', action.payload)
        state.token = action.payload
    //  } catch (e) {
    //     console.log(e.message)
    //   }

    },
    updateToken: (state,action) => {
      // try {
      //   const value = await AsyncStorage.getItem('token')
      //   if(value !== null) {
      //    return
      //   }
        state.token = action.payload
        state.isLoading = false

      // } catch(e) {
      //   console.log(e.message)
      // }
      
    },
    removeToken: (state) => {
      state.token = null
      state.isLoggedIn = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { storeToken, updateToken, removeToken  } = authSlice.actions

export default authSlice.reducer
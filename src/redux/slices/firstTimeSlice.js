import { createSlice } from '@reduxjs/toolkit'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isFirstTime:null
}

export const firstTimeSlice = createSlice({
  name: 'first time',
  initialState,
  reducers: {
    updateValue: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      // try {
      //   await AsyncStorage.setItem('first time', action.payload)
      // } catch (e) {
      //   console.log(e.message)
      //}
      state.isFirstTime = action.payload
    },
    checkValue: (state) => {

      // try {
      //   const value = await AsyncStorage.getItem('first time')
      //   if(value !== null) {
      //    return
      //   }
       // state.isFirstTime = value

      // } catch(e) {
      //   console.log(e.message)
      // }
   
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { updateValue, checkValue  } = firstTimeSlice.actions

export default firstTimeSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

const accountSlice = createSlice({
  name: 'my account',
  initialState: {
    username:'',
    profilePic:null,
    email:'',
    balance:0
  },
  reducers: {
    updateAccountDetails: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.username = action.payload.username
      state.profilePic = action.payload.profilePic
      state.email = action.payload.email
      state.balance = action.payload.balance

    },
    // updateIsChosen: (state,payload) => {
    //   state.isChosen = payload.payload
    // }
  }
})

export const { updateAccountDetails } = accountSlice.actions
export default accountSlice.reducer


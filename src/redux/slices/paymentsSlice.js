import { createSlice } from '@reduxjs/toolkit'

const paymentsSlice = createSlice({
  name: 'payments',
  initialState: {
    payments:[
      { dateRequested:'10 Nov 2022', username:'Tim', amount:2000, method:'Banking details'},
      { dateRequested:'07 Oct 2022', username:'James', amount:500, method:'e-Wallet'},
      { dateRequested:'11 Dec 2022', username:'Tinashe', amount:1500, method:'Send cash'},
    ]
  },
  reducers: {
    updatePayments: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.payments = action.payload
  
    },
    // updateIsChosen: (state,payload) => {
    //   state.isChosen = payload.payload
    // }
  }
})

export const { updatePayments } = paymentsSlice.actions
export default paymentsSlice.reducer


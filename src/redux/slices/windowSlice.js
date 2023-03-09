import { createSlice } from '@reduxjs/toolkit'

const getWindowSize = () =>{
  const { innerWidth, innerHeight } = window
  console.log("WIDTH ", innerWidth, "    HEIGHT ", innerHeight)

  return { windowWidth:innerWidth, windowHeight:innerHeight }
}

const windowSlice = createSlice({
  name: 'window size',
  initialState: {
    windowSize:getWindowSize()
  },
  reducers: {
    updateSize: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.windowSize = action.payload
  
    },
    // updateIsChosen: (state,payload) => {
    //   state.isChosen = payload.payload
    // }
  }
})

export const { updateSize } = windowSlice.actions
export default windowSlice.reducer


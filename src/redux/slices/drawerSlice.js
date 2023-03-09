import { createSlice } from '@reduxjs/toolkit'
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    isOpen:false
}

export const drawerSlice = createSlice({
  name: 'drawer animation',
  initialState,
  reducers: {
    openDrawer: (state) => {
      state.isOpen = true
    },
    closeDrawer: (state) => {
      state.isOpen = false
    }, 
  },
})

// Action creators are generated for each case reducer function
export const { openDrawer, closeDrawer  } = drawerSlice.actions

export default drawerSlice.reducer
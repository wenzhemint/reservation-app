import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedTab: 'main'
}

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialState,
  reducers: {
    updateMenuTab(state, action) {
      state.selectedTab = action.payload
    }
  }
})

export const { updateMenuTab } = menuSlice.actions
export default menuSlice.reducer
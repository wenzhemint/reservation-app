import { createSlice } from '@reduxjs/toolkit'

type MenuState = {
  selectedTab: string
}

const initialState: MenuState = {
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
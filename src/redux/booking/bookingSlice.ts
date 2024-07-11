import { createSlice } from '@reduxjs/toolkit'
import { CURRENT_PROGRESS } from "../../utils/helpers/constants"

type Booking = {
  tables: object;
  currentProgres: number
}

const initialState: Booking = {
  tables: {},
  currentProgres: CURRENT_PROGRESS.BOOK
}

const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    updateTables(state, action) {
      state.tables = action.payload
    },
    updateCurrentProgres(state, action) {
      state.currentProgres = action.payload
    }
  }
})

export const { updateTables, updateCurrentProgres } = bookingSlice.actions
export default bookingSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { CURRENT_PROGRESS } from "../../utils/helpers/constants"
import { CurrentTableInfo, Table } from '../../models/model';

type BookingState = {
  tables: Table[];
  currentProgres: number,
  selectedTableInfo: CurrentTableInfo | {}
}

const initialState: BookingState = {
  tables: [],
  currentProgres: CURRENT_PROGRESS.BOOK,
  selectedTableInfo: {}
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
    },
    updateSelectedTableInfo(state, action) {
      state.selectedTableInfo = action.payload
    }
  }
})

export const { 
  updateTables, 
  updateCurrentProgres, 
  updateSelectedTableInfo 
} = bookingSlice.actions
export default bookingSlice.reducer
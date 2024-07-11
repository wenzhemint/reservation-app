import { configureStore } from '@reduxjs/toolkit';
import menuSlice from './redux/menu/menuSlice';
import bookingSlice from './redux/booking/bookingSlice';
import logger from 'redux-logger';

const loggerMiddleware = process.env.NODE_ENV === 'development' ? logger : [];
  
const store = configureStore({
  reducer: {
    menu: menuSlice,
    booking: bookingSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
});

export default store;

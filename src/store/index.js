import { configureStore } from '@reduxjs/toolkit';
import AviaSalesReducer from './AviaSalesSlice';

export default configureStore({
  reducer: {
    tickets: AviaSalesReducer,
  },
});

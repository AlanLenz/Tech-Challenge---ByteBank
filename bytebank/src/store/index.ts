import { configureStore } from '@reduxjs/toolkit';
import transfersReducer from './transfersSlice';

export const store = configureStore({
  reducer: {
    transfers: transfersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
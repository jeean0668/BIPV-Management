// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './actions/counterSlice';
import mapReducer from './actions/mapSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    map : mapReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

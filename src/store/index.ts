// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './actions/counterSlice';
import mapReducer from './actions/mapSlice';
import analysisReducer from './actions/analysisSlice';
 
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    map : mapReducer, 
    analysis : analysisReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

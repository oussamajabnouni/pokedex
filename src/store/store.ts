import { configureStore } from '@reduxjs/toolkit';
import { paginationReducer, filterReducer } from './slices';

export const store = configureStore({
  reducer: {
    pagination: paginationReducer,
    filter: filterReducer,
  },
});

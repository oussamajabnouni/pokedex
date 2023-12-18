import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PaginationState {
  currentPage: number;
  offset: number;
}

const initialState: PaginationState = {
  currentPage: 1,
  offset: 0,
};

const getOffset = (currentPage: number) => (currentPage - 1) * 20;

/**
 * Slice for managing the current page number.
 */
const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    nextPage: state => {
      state.currentPage += 1;
      state.offset = getOffset(state.currentPage);
    },
    previousPage: state => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
        state.offset = getOffset(state.currentPage);
      }
    },
    resetPagination: state => {
      state.currentPage = 1;
    },
  },
});

export const { nextPage, previousPage, resetPagination } = paginationSlice.actions;

export const paginationReducer = paginationSlice.reducer;

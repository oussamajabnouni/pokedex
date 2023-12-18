import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  searchTerm: string;
  typeFilter: string;
  abilityFilter: string;
}

const initialState: FilterState = {
  searchTerm: '',
  typeFilter: '',
  abilityFilter: '',
};

/**
 * Represents the filter slice of the Redux store.
 */
const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.trim();
    },
    setTypeFilter: (state, action: PayloadAction<string>) => {
      state.typeFilter = action.payload.trim();
      state.searchTerm = '';
      state.abilityFilter = '';
    },
    setAbilityFilter: (state, action: PayloadAction<string>) => {
      state.abilityFilter = action.payload.trim();
      state.searchTerm = '';
      state.typeFilter = '';
    },
    resetTypeFilter: state => {
      state.typeFilter = '';
    },
    resetAbilityFilter: state => {
      state.abilityFilter = '';
    },
  },
});

export const {
  setSearchTerm,
  setTypeFilter,
  setAbilityFilter,
  resetTypeFilter,
  resetAbilityFilter,
} = filterSlice.actions;

export const filterReducer = filterSlice.reducer;

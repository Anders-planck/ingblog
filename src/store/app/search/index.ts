import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store';

export interface SearchState {
  search: string;
  opened: boolean;
}
const initialState: SearchState = {
  search: '',
  opened: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    openSearchModal(state) {
      state.opened = true;
    },

    closeSearchModal(state) {
      state.opened = false;
    },
  },
});

export const { setSearch, openSearchModal, closeSearchModal } = searchSlice.actions;

export const { reducer } = searchSlice;

export const selectSearch = ({ search }: RootState) => search.search;

export const selectOpened = ({ search }: RootState) => search.opened;

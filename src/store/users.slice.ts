import { Pagination } from '@/types/pagination.type';
import { User } from '@/types/user.type';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IUsersState {
  users: User[];
  pagination: Pagination;
}

const initialState: IUsersState = {
  users: [],
  pagination: { currentPage: 0, totalPages: 0 },
};

export const usersSlice = createSlice({
  name: 'usersState',
  initialState,
  reducers: {
    setUsersState: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setPaginationState: (state, action: PayloadAction<Pagination>) => {
      state.pagination = action.payload;
    },
  },
});

export const { setUsersState, setPaginationState } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;

import { createSlice, isAllOf } from "@reduxjs/toolkit";
import { usersApi } from "../../app/api/usersApi";

const users = {
  currentUsers: [],
  totalUsersCount: 0
}

export const usersSlice = createSlice({
  name: "users",
  initialState: users,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAllOf(usersApi.endpoints.getUsers.matchFulfilled),
      (state, action) => {
        state.currentUsers = [...action.payload.detail['items']];
        state.totalUsersCount = action.payload.detail['totalItemsCount'];
        return state
      }
    );
  }
});

export const { } = usersSlice.actions;

export default usersSlice.reducer;

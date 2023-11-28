import { createSlice, isAllOf } from "@reduxjs/toolkit";
import { authApi } from "../../app/api/authApi";
import { initialState } from "../../interfaces/AuthSliceInitialState";
import { ITokens } from "../../interfaces/Tokens.interface";
import { AppDispatch } from "../store";

const initialState: initialState = {
  user: {},
  tokens: {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload;
      return state;
    },
    setAccessToken: (state, action) => {
      state.tokens = action.payload;
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAllOf(authApi.endpoints.authMe.matchFulfilled),
      (state, action) => {
        state.user = {...Object(action.payload.detail)};
      }
    );
    builder.addMatcher(
      isAllOf(authApi.endpoints.logoutUser.matchFulfilled),
      (state, action) => {
        state.user = {};
        localStorage.setItem("accessToken", undefined)
      }
    );
    builder.addMatcher(
      isAllOf(authApi.endpoints.loginUser.matchFulfilled),
      (state, action) => {
        const res = Object(action.payload.detail);
        const {accessToken, actionToken, refreshToken, ...user} = res
        state.user = {...user};
        state.tokens = {accessToken, actionToken, refreshToken}
      }
    )
    builder.addMatcher(
      isAllOf(authApi.endpoints.logoutUser.matchFulfilled),
      (state, action) => {
        state.user = {};
        state.tokens = {}
      }
    )
  }
});

export const setTokens = (tokens: Partial<ITokens>) => async (dispatch: AppDispatch) => {
  dispatch(setAccessToken(tokens))
  localStorage.setItem("accessToken", JSON.stringify(tokens.accessToken));
  localStorage.setItem("actionToken", JSON.stringify(tokens.actionToken));
  localStorage.setItem("refreshToken", JSON.stringify(tokens.refreshToken));
}


export const { setAuthData, setAccessToken } = authSlice.actions;

export default authSlice.reducer;

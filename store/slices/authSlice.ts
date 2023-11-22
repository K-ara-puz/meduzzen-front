import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../app/api/authApi";

const initialState = {
  user: {},
  mainRes: {}
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action) => {
      state.user = action.payload;
      return state;
    },
    setMainResponse: (state, action) => {
      state.mainRes = action.payload;
      return state;
    }
  },
});

export const setTokens = (tokens) => (dispatch) => {
  localStorage.setItem("accessToken", JSON.stringify(tokens.accessToken));
  localStorage.setItem("actionToken", JSON.stringify(tokens.actionToken));
  localStorage.setItem("refreshToken", JSON.stringify(tokens.refreshToken));
}

export const loginUser = (userData) => async (dispatch) => {
  const res = await dispatch(authApi.endpoints.loginUser.initiate(userData));
  const { actionToken, accessToken, refreshToken, ...user } = res.data.detail;
  await dispatch(setTokens({actionToken, accessToken, refreshToken}))
}

export const authMe = () => async (dispatch) => {
  const res = await dispatch(authApi.endpoints.authMe.initiate({
    url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`,
    token: localStorage.getItem('accessToken')
  }));
  await dispatch(setAuthData(res.data));
}

export const logoutUser = () => async (dispatch) => {
  await dispatch(setAuthData({}));
  dispatch(setTokens({actionToken: null, accessToken: null, refreshToken: null}));
}

export const { setAuthData, setMainResponse } = authSlice.actions;

export default authSlice.reducer;

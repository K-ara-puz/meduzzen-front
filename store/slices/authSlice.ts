import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mainApi } from "../../app/api/api";

export interface authSliceData extends authSliceUser {
  user: object;
}
interface authSliceUser {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  actionToken: string;
  accessToken: string;
  refreshToken: string;
  image?: string;
}

const initialState: Partial<authSliceData> = {
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<Partial<authSliceData>>) => {
      if (action.payload.hasOwnProperty("accessToken")) {
        const { actionToken, accessToken, refreshToken, ...user } =
          action.payload;
        const tokens = {
          accessToken,
          actionToken,
          refreshToken,
        };
        state.user = user;
        localStorage.setItem("tokens", JSON.stringify(tokens));
        return state;
      }
      state.user = action.payload;
      return state;
    },
  },
});

export const setAuthDataFromAuth0 = (userData) => async (dispatch) => {
  const userD = {
    email: userData.email,
    password: 'null'
  }  
  const loginedUser = await dispatch(
    mainApi.endpoints.loginUser.initiate(userD)
  );
  if (loginedUser.error?.status == 404) {
    await dispatch(
      mainApi.endpoints.registerUser.initiate({
        firstName: "null",
        lastName: "null",
        email: userD.email,
        password: userD.password,
        confirmPassword: userD.password
      })
    );
  }
  const result = await dispatch(
    mainApi.endpoints.loginUser.initiate(userD)
  );
  dispatch(setAuthData(result.data.detail))
};

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;

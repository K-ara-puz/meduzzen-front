import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import globalReducer from "./slices/globalData";
import { mainApi } from "../app/api/api";
import { reducer as formReducer } from "redux-form";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import { authApi } from "../app/api/authApi";
import { usersApi } from "@/app/api/usersApi";
import { companiesApi } from "../app/api/companiesApi";
import { invitesApi } from "../app/api/invitesApi";
import { companyApi } from "../app/api/companyApi";
import { quizzesApi } from "../app/api/quizzesApi";
import { companyAnatilicsApi } from "@/app/api/companyAnaliticApi";

export const store = configureStore({
  reducer: {
    testStore: globalReducer,
    auth: authReducer,
    users: usersReducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [invitesApi.reducerPath]: invitesApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [quizzesApi.reducerPath]: quizzesApi.reducer,
    [companyAnatilicsApi.reducerPath]: companyAnatilicsApi.reducer,
    form: formReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      mainApi.middleware,
      authApi.middleware,
      usersApi.middleware,
      companiesApi.middleware,
      invitesApi.middleware,
      companyApi.middleware,
      quizzesApi.middleware,
      companyAnatilicsApi.middleware,
    ]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalData';
import { mainApi } from '../app/api/api';
import { reducer as formReducer } from 'redux-form';
import authReducer from './slices/authSlice';
import { authApi } from '../app/api/authApi';

export const store = configureStore({
  reducer: {
    testStore: globalReducer,
    auth: authReducer,
    [mainApi.reducerPath]: mainApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    form: formReducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([mainApi.middleware, authApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

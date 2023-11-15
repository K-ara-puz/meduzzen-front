import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import globalReducer from './slices/globalData';
import { mainApi } from '../app/api/api';
import { reducer as formReducer } from 'redux-form';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    testStore: globalReducer,
    auth: authReducer,
    [mainApi.reducerPath]: mainApi.reducer,
    form: formReducer
  },
  
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([mainApi.middleware]),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

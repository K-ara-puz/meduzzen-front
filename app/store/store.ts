import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import globalReducer from './features/globalData';
import { mainApi } from '../../api/api';

export const store = configureStore({
  reducer: {
    testStore: globalReducer,
    [mainApi.reducerPath]: mainApi.reducer
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

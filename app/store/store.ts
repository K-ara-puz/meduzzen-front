import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import globalReducer from './features/globalData';

const store = configureStore({
  reducer: {
    testStore: globalReducer
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface globalData {
  test: string;
}

const initialState: globalData = {
  test: 'This is test string',
};

export const globalSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setTestString: (state, action: PayloadAction<string>) => {
      state.test = action.payload;
      return state;
    },
  },
});

export const { setTestString } = globalSlice.actions;

export default globalSlice.reducer;
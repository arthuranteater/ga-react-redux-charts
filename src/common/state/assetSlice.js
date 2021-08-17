import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAll } from "./assetAPI";

const initialState = {
  value: "",
  limit: null,
  status: "idle",
};

export const runFetch = createAsyncThunk("asset/getAll", async (amount) => {
  const response = await getAll();
  return response;
});

export const assetSlice = createSlice({
  name: "asset",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(runFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(runFetch.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      });
  },
});

export const selectData = (state) => state.asset.value;
export const selectLimit = (state) => state.asset.limit;
export const selectStatus = (state) => state.asset.status;

export const limitData = (limit) => (dispatch, getState) => {
  if (selectLimit(getState())) {
    dispatch(runFetch(limit));
  }
};

export default assetSlice.reducer;

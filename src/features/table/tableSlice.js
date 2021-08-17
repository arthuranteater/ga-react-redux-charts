import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getData } from "./tableAPI";

const initialState = {
  value: "",
  limit: null,
  status: "idle",
};

export const runFetch = createAsyncThunk("table/getData", async (amount) => {
  const response = await getData();
  return response;
});

export const tableSlice = createSlice({
  name: "table",
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

export const selectData = (state) => state.table.value;
export const selectLimit = (state) => state.table.limit;
export const selectStatus = (state) => state.table.status;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const limitData = (limit) => (dispatch, getState) => {
  if (selectLimit(getState())) {
    dispatch(runFetch(limit));
  }
};

export default tableSlice.reducer;

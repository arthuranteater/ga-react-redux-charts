import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/table/tableSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

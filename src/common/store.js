import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "../features/table/tableSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});

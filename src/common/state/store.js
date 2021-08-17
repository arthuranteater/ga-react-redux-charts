import { configureStore } from "@reduxjs/toolkit";
import assetReducer from "./assetSlice";

export const store = configureStore({
  reducer: {
    asset: assetReducer,
  },
});

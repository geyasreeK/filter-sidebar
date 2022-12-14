import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/globalSlice";

const store = configureStore({
  reducer: {
    globalState: globalReducer,
  },
});

export default store;

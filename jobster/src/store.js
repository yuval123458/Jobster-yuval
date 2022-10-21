import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/user-slice";
import jobSlice from "./reducers/job-slice";

const store = configureStore({
  reducer: {
    user: userSlice,
    jobs: jobSlice,
  },
});

export default store;

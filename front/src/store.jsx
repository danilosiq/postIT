import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlices";
import userReducer from "./slices/userSlices";
import photoReducer from "./slices/photoSlices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    photo: photoReducer,
  },
});

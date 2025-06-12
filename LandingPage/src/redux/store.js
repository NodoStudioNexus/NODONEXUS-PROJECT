import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "./slices/projectsSlice";
import serviceReducer from "./slices/serviceSlice";

export const store = configureStore({
  reducer: {
    serviceData: serviceReducer,
    projectsData: projectsReducer,
  },
});

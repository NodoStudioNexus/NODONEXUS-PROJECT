import { createSlice } from "@reduxjs/toolkit";
import { serviceData } from "../../data/servicesData";

const initialState = {
  serviceData,
};
const serviceSlice = createSlice({
  name: "serviceData",
  initialState,
});

export default serviceSlice.reducer;

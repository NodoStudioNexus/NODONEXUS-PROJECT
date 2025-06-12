import { createSlice } from "@reduxjs/toolkit";
import { projectsData } from "../../data/projectsData";

const initialState = {
  projectsData,
};
const projectsSlice = createSlice({
  name: "pronectData",
  initialState,
});
export default projectsSlice.reducer;

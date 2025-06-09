import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAcademyTestsAPI } from "./academyTestsService";
import { normalizeAcademyTest } from "../constants";

export const getAcademyTests = createAsyncThunk(
  "academy-tests/fetch",
  async () => {
    try {
      const data = await fetchAcademyTestsAPI();
      const normalized = normalizeAcademyTest(data);
      return normalized;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const academyTestsSlice = createSlice({
  name: "academyTests",
  initialState: { data: null, loading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(getAcademyTests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAcademyTests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAcademyTests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const academyTestsReducer = academyTestsSlice.reducer;

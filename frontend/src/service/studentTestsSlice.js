import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createTestRecord, fetchAcademyTestsAPI } from "./academyTestsService";
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

export const addTestRecord = createAsyncThunk(
  "academy-tests/addTestRecord",
  async (testData, { dispatch, rejectWithValue }) => {
    try {
      await createTestRecord(testData);
      dispatch(getAcademyTests());
    } catch (error) {
      return rejectWithValue(error.message || "fail to save test record");
    }
  }
);

const academyTestsSlice = createSlice({
  name: "academyTests",
  initialState: { data: null, loading: false, error: null, success: false },
  reducers: {
    academyTestsSliceResetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
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
      })
      .addCase(addTestRecord.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addTestRecord.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addTestRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
  },
});

export const academyTestsReducer = academyTestsSlice.reducer;
export const { academyTestsSliceResetStatus } = academyTestsSlice.actions;

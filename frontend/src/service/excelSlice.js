import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const uploadExcel = createAsyncThunk(
  "excelUpload",
  async (file, { rejectWithValue }) => {
    try {
      await uploadExcel(file);
    } catch (error) {
      return rejectWithValue(error.message || "fail to upload excel file");
    }
  }
);

const excelSlice = createSlice({
  name: "excel",
  initialState: { loading: false, error: null, success: false },
  reducers: {
    excelSliceResetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadExcel.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadExcel.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadExcel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
  },
});

export const excelReducer = excelSlice.reducer;
export const { excelSliceResetStatus } = excelSlice.actions;

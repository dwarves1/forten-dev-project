import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createStudent } from "./academyTestsService";
import { fetchStudentListAPI } from "./academyTestsService";
import { normalizeStudentList } from "../constants";

// 학생 목록 가져오기
export const getStudents = createAsyncThunk(
  "academyTests/fetchStudent",
  async () => {
    try {
      const data = await fetchStudentListAPI();
      const normalized = normalizeStudentList(data);
      return normalized;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

// 학생 추가
export const addStudent = createAsyncThunk(
  "academyTests/addStudent",
  async (studentData, { dispatch, rejectWithValue }) => {
    try {
      await createStudent(studentData);
      dispatch(getStudents());
    } catch (error) {
      return rejectWithValue(error.message || "fail to save student");
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState: { students: [], loading: false, error: null, success: false },
  reducers: {
    studentSliceResetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(getStudents.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "학생 목록을 가져오는 데 실패했습니다.";
      })
      .addCase(addStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addStudent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.success = false;
      });
  },
});

export const studentReducer = studentSlice.reducer;
export const { studentSliceResetStatus } = studentSlice.actions;

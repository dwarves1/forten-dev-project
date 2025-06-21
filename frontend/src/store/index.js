import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { academyTestsReducer } from "../service/studentTestsSlice";
import { studentReducer } from "../service/studentSlice";
import { excelReducer } from "../service/excelSlice";

export const store = configureStore({
  reducer: {
    academyTests: academyTestsReducer,
    student: studentReducer,
    excel: excelReducer,
  },
});

export const useAppDispatch = () => useDispatch();

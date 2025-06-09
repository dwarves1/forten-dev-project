import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { academyTestsReducer } from "../service/studentTestsSlice";

export const store = configureStore({
  reducer: { academyTests: academyTestsReducer },
});

export const useAppDispatch = () => useDispatch();

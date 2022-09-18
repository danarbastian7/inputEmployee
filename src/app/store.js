// ini tempat penyimpanan utama Global State

import { configureStore } from "@reduxjs/toolkit"
import counterSlice from "../features/counter/counterSlice"
import studentSlice from "../features/students/studentSlice"
import employeeSlice from "../features/employee/employeeSlice"

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    students: studentSlice,
    employee: employeeSlice,
  },
})

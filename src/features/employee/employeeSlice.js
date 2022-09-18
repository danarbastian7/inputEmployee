import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: [],
  currentEmployee: {
    id: 0,
    Name: "",
    Email: "",
    Password: "",
  },
  loginEmployee: {
    id: "",
    Name: "",
    Email: "",
    Password: "",
  },
}

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    fillEmployeeList: (state, action) => {
      state.data = action.payload
    },
    fillCurrentEmployee: (state, action) => {
      const { Name, Email, Password, id } = action.payload
      state.currentEmployee = {
        Name,
        Email,
        Password,
        id,
      }
    },
    loginEmployee: (state, action) => {
      const { Name, Email, Password, id } = action.payload
      state.loginEmployee = {
        id,
        Name,
        Email,
        Password,
      }
    },
    logoutEmployee: (state) => {
      state.loginEmployee = { ...initialState.loginEmployee }
    },
  },
})

export const {
  fillEmployeeList,
  fillCurrentEmployee,
  loginEmployee,
  logoutEmployee,
} = employeeSlice.actions

export default employeeSlice.reducer

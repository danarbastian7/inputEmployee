import { createSlice } from "@reduxjs/toolkit"

//1. Setup Slice
//2. Import di Store
//3. Isi initial state dengan dummy data
//4. Render Data
//5. Setup Form
//6. Feature add data

const initialState = {
  data: [
    {
      name: "Seto",
      gender: "Male",
      course: "UI/UX",
    },
  ],
}

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addStudent: (state, action) => {
      let newStudent = {
        name: action.payload.name,
        gender: action.payload.gender,
        course: action.payload.course,
      }
      state.data.push(newStudent)
      //   state.data.push(action.payload)
    },
  },
})

export const { addStudent } = studentSlice.actions

export default studentSlice.reducer

import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    reset: (state) => {
      state.value = 0
    },
    overwriteValue: (state, action) => {
      state.value = action.payload
    },
  },
})

//Action adalah function yang akan return sebuah "Action Object"
//Action Object:
//- Type
// - Payload

//Reducer adalah kumpulan condition yang akan mengubah isi global state
//setiap condition dari reducer akan mengecek "type" dari Action Object
//yang artinya perubahan isi global state, akan ditentukan
//berdasarkan type action object yang dikirimkan reducer

//nama Function di reducer/condition akan menjadi nama type di reducer
//untuk mengganti isi store

export const { increment, decrement, reset, overwriteValue } =
  counterSlice.actions

export default counterSlice.reducer

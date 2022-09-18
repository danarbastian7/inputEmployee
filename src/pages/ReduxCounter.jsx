import { Box, Button, Text, Input } from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  increment,
  decrement,
  reset,
  overwriteValue,
} from "../features/counter/counterSlice"

const ReduxCounter = () => {
  const [numInput, setNumInput] = useState(0)

  const counterSelector = useSelector((state) => state.counter)
  const dispacth = useDispatch()

  const incrementBtnHandler = () => {
    dispacth(increment())
  }
  const decrementBtnHandler = () => {
    dispacth(decrement())
  }
  const resetBtnHandler = () => {
    dispacth(reset())
  }
  const submitBtnHandler = () => {
    dispacth(overwriteValue(Number(numInput)))
  }

  return (
    <Box align={"center"} justifyContent={"center"}>
      <Text>
        <b>Redux Counter</b>
      </Text>

      <Text fontSize={"4xl"} fontWeight={"bold"}>
        {counterSelector.value}
      </Text>
      <Button backgroundColor={"twitter.300"} onClick={incrementBtnHandler}>
        Increment
      </Button>
      <Button
        backgroundColor={"twitter.300"}
        mr={"3"}
        ml={"3"}
        onClick={decrementBtnHandler}
      >
        Decrement
      </Button>
      <Button backgroundColor={"twitter.300"} onClick={resetBtnHandler}>
        Reset
      </Button>
      <br />

      <Input
        border={"2px"}
        borderColor={"blue.400"}
        mt={"5px"}
        textAlign={"center"}
        width={"200px"}
        value={numInput}
        onChange={(event) => setNumInput(event.target.value)}
        type={"number"}
      />
      <br />
      <Button
        mt={"5px"}
        backgroundColor={"whatsapp.400"}
        onClick={submitBtnHandler}
      >
        Submit
      </Button>
    </Box>
  )
}

export default ReduxCounter

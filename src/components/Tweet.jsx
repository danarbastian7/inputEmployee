import { useState } from "react"
import {
  Button,
  Textarea,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react"

const Tweet = () => {
  const [inputText, setInputText] = useState("")

  const showTweet = () => {
    alert(inputText)
  }

  return (
    // Component hanya boleh return 1 element (parent) saja
    <>
      <Textarea
        placeholder="Write your text here"
        width={"500px"}
        isInvalid={inputText.length >= 140}
        color={inputText.length >= 140 ? "red" : "black"}
        value={inputText}
        onChange={(event) => setInputText(event.target.value)}
      />
      <br />
      <span
        style={{
          color: inputText.length >= 140 ? "red" : "black",
        }}
      >
        {inputText.length} / 140
      </span>
      <CircularProgress
        marginInlineStart={"400px"}
        position={"relative"}
        value={(inputText.length / 140) * 100}
        color={inputText.length >= 140 ? "red" : "blue"}
      >
        {inputText.length >= 120 ? (
          <CircularProgressLabel>
            {140 - inputText.length}
          </CircularProgressLabel>
        ) : null}
      </CircularProgress>
      <br />
      <Button
        colorScheme="twitter"
        disabled={inputText.length >= 140}
        onClick={showTweet}
      >
        Tweet
      </Button>
    </>
  )
}

export default Tweet
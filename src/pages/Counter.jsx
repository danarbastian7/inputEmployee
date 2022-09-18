import { useState } from "react"
import {Text, Box, Button, Stack, HStack} from "@chakra-ui/react"

const Counter = () => {
    let [counter, setCounter] = useState (0)

    const incrementCounter = () => {
      setCounter(counter + 1)
    }
    const decreamentCounter = () => {
        if (counter <= 0){
            return false
        }
        setCounter(counter - 1)
        
    }
    const resetCounter = () => {
        setCounter (0)
    }
   
   
    


    return( 
    //div yang memiliki display  flex dan direction column
    <Box mt={"8"}>
     <Text>Counter Page: {counter}</Text>
           
   <Stack width={"300px"}> 
        <HStack spacing={"3"} mt="5">
            <Button color={"blackAlpha.900"} colorScheme={"whatsapp"} flex={1} onClick={incrementCounter}>Tambah</Button>
            <Button color={"blackAlpha.900"} colorScheme={"red"} flex={2} onClick={decreamentCounter}>Kurang</Button>
            <Button color={"blackAlpha.900"} colorScheme={"linkedin"} flex={1} onClick={resetCounter}>Reset</Button>
       
        </HStack>
    </Stack>
    </Box>
    )
}


export default Counter
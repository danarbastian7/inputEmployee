import {
  Box,
  Button,
  Text,
  Input,
  Table,
  Tfoot,
  RadioGroup,
  Container,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  HStack,
  Radio,
  Select,
  GridItem,
  Grid,
} from "@chakra-ui/react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addStudent } from "../features/students/studentSlice"

const studentsCounter = () => {
  const studentsCounter = useSelector((state) => state.students)
  const dispacth = useDispatch()

  const [inputName, setInputName] = useState("")
  const [inputGender, setInputGender] = useState("")
  const [inputCourse, setInputCourse] = useState("")

  const renderStudents = () => {
    return studentsCounter.data.map((val, idx) => {
      return (
        <Tr key={val.name}>
          <Td>{val.name}</Td>
          <Td>{val.gender}</Td>
          <Td>{val.course}</Td>
        </Tr>
      )
    })
  }
  const addDataBtnHandler = () => {
    let newStudent = {
      name: inputName,
      gender: inputGender,
      course: inputCourse,
    }
    dispacth(addStudent(newStudent))
  }
  return (
    <Box>
      <Container maxW="container.lg">
        <Text m="1" fontSize={"4xl"} fontWeight="bold" align={"center"}>
          Student Page
        </Text>
        <Box
          ml={"6"}
          backgroundColor="twitter.500"
          textColor={"white"}
          padding="1"
          fontWeight={"bold"}
        >
          Student Summary: {studentsCounter.data.length}
        </Box>

        <Box overflowY={"auto"} maxHeight={"250px"}>
          <Table>
            <Thead>
              <Tr fontWeight={"bold"} fontSize={"5px"} overflowY={"300px"}>
                <Th>Name</Th>
                <Th>Gender</Th>
                <Th>Course</Th>
                <Th></Th>
              </Tr>
            </Thead>

            <Tbody maxW="container.lg">{renderStudents()}</Tbody>
          </Table>
        </Box>
      </Container>
      <Container>
        <HStack width={"700px"} align={"center"} mt={"10px"}>
          <Input
            width={"1000px"}
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
            placeholder="Input Name"
          />

          <RadioGroup
            onChange={(value) => setInputGender(value)}
            value={inputGender}
          >
            <HStack>
              <Radio value="Male">Male</Radio>
              <Radio value="female">Female</Radio>
            </HStack>
          </RadioGroup>

          <Select
            width={"1700px"}
            value={inputCourse}
            onChange={(event) => setInputCourse(event.target.value)}
          >
            <option>Web Development</option>
            <option>Data Science</option>
            <option>Digital Marketing</option>
            <option>UI/UX</option>
          </Select>

          <Button
            width={"350px"}
            onClick={addDataBtnHandler}
            colorScheme={"twitter"}
          >
            Add Data
          </Button>
        </HStack>
      </Container>
    </Box>
  )
}

export default studentsCounter

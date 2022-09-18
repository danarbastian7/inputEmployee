import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
  Container,
  GridItem,
  Heading,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Link,
  HStack,
} from "@chakra-ui/react"
import axios from "axios"
import { jsonServerApi } from "../api"
import { useState, useEffect } from "react"
import axiosInstance from "../api"
import { useFormik } from "formik"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import {
  fillEmployeeList,
  fillCurrentEmployee,
} from "../features/employee/employeeSlice"

const EmployeeList = () => {
  const [product, setProduct] = useState([])
  const dispatch = useDispatch()
  const toast = useToast()
  const employeeSelector = useSelector((state) => state.employee)

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:2000/EmployeeList")
      dispatch(fillEmployeeList(response.data))
    } catch (err) {
      // console.log(err)
      toast({
        title: "Network Error",
        status: "error",
      })
    }
  }

  const deleteBtnHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/EmployeeList/${id}`)
      fetchEmployees()
      toast({ title: "Employee Deleted", status: "success" })
    } catch (err) {
      concole.log(err)
    }
  }

  const renderEmployee = () => {
    return employeeSelector.data.map((val) => {
      return (
        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.Name}</Td>
          <Td>{val.Email}</Td>
          <Td>{val.Password}</Td>
          <Td>
            <HStack>
              <Button
                isDisabled={employeeSelector.currentEmployee.id === val.id}
                onClick={() => dispatch(fillCurrentEmployee(val))}
                mx={1}
                ml={"1px"}
                colorScheme={"linkedin"}
                size={"sm"}
              >
                Show Data
              </Button>

              <Button
                mx={1}
                ml={"1px"}
                colorScheme={"red"}
                onClick={() => deleteBtnHandler(val.id)}
                size={"sm"}
              >
                Delete
              </Button>
            </HStack>
          </Td>
        </Tr>
      )
    })
  }
  useEffect(() => {
    fetchEmployees()
  }, [])

  let navigate = useNavigate()

  // const formChangeHandler = ({ target }) => {
  //   const { name, value } = target

  //   formik.setFieldValue(name, value)
  // }

  return (
    <Container maxW={"container.lg"}>
      <Container overflowY={"scroll"} maxH={"400px"}>
        <Text fontWeight={"bold"} align={"center"} fontSize={"36px"}>
          Employee List
        </Text>

        <Table
          mt={"30px"}
          variant={"striped"}
          colorScheme={"twitter"}
          size={"sm"}
          overflowY="scroll"
          height={"10px"}
        >
          <Thead colorScheme={"twitter"} fontSize={"20px"}>
            <Tr fontSize={"50px"} fontWeight={"bold"}>
              <Td>ID</Td>
              <Td>Username</Td>
              <Td>Email</Td>
              <Td>Password</Td>
              <Td align={"center"}>Action</Td>
            </Tr>
          </Thead>
          <Tbody overflowY="scroll" height={"10px"}>
            {renderEmployee()}
          </Tbody>
        </Table>
      </Container>
      <Grid templateColumns="repeat(2,1fr)">
        <GridItem>
          <Container
            fontWeight={"bold"}
            mt={"10px"}
            border={"2px"}
            w={"300px"}
            color={"telegram.600"}
            ml={"210px"}
          >
            <Text>Employee Data</Text>
            <Text>ID: {employeeSelector.currentEmployee.id}</Text>
            <Text>Name: {employeeSelector.currentEmployee.Name}</Text>
            <Text>Email: {employeeSelector.currentEmployee.Email}</Text>
            <Text>Password: {employeeSelector.currentEmployee.Password}</Text>
          </Container>
        </GridItem>
        <GridItem>
          <Text>
            <Button
              onClick={() => navigate(-1)}
              size={"sm"}
              colorScheme={"whatsapp"}
              ml={"230px"}
              mt={"10px"}
            >
              Back
            </Button>
          </Text>
        </GridItem>
      </Grid>
    </Container>
  )
}

export default EmployeeList

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
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react"
import axios from "axios"
import { useState, useEffect } from "react"
import axiosInstance from "../api"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"

import { useDispatch, useSelector } from "react-redux"
import { fillEmployeeList } from "../features/employee/employeeSlice"

const EmployeeForm = () => {
  const toast = useToast()
  const dispacth = useDispatch()
  const [showPassword, setShowPassword] = useState(false)
  const employeeSelector = useSelector((state) => state.employee)

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:2000/EmployeeList")
      dispacth(fillEmployeeList(response.data))
    } catch (err) {
      console.log(err)
      alert("Server error")
    }
  }

  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
    },

    onSubmit: async ({ Name, Email, Password }) => {
      try {
        let newEmployee = {
          Name,
          Email,
          Password,
        }
        await axios.post("http://localhost:2000/EmployeeList", newEmployee)
        fetchEmployees()
        formik.setFieldValue("Name", "")
        formik.setFieldValue("Email", "")
        formik.setFieldValue("Password", "")

        toast({ title: "Employee Added", status: "success" })
      } catch (err) {
        toast({ title: "Network Error", status: "error" })
        // console.log(err)
        // alert(err)
      }
    },
    validationSchema: Yup.object({
      Name: Yup.string().required().min(3),
      Email: Yup.string().email().required(),
      Password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }
  const tooglePassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Container maxW={"container.lg"} align={"center"}>
      <Box
        ml={"6"}
        backgroundColor="twitter.500"
        textColor={"white"}
        padding="1"
        fontWeight={"bold"}
      >
        <Text>Total Employee: {employeeSelector.data.length}</Text>
      </Box>

      <br />
      <Grid
        // templateColumns="repeat(2,1fr)"
        gap={4}
        justifyItems={"center"}
        alignContent={"center"}
        ml={"-500px"}
        mt={"-30px"}
      >
        <GridItem>
          <Box
            w={["full", "md"]}
            p={[9, 10]}
            marginLeft={"500px"}
            marginTop={"20px"}
            // mt={[20, "30vh"]}
            // mx="auto"
            border={["none", "2px"]}
            borderColor={["", "blue.300"]}
            borderRadius={[10]}
            // align={"center"}
            // justifyItems={"center"}
          >
            <Box
              mt={"-30px"}
              ml={"-250px"}
              backgroundColor={"whatsapp.500"}
              boxSize={"max-content"}
              padding={"5px"}
              borderRadius={"10px"}
              fontWeight={"bold"}
              color={"white"}
              fontFamily={"sans-serif"}
            >
              <Link to="/EmployeeList"> List of Employee </Link>
            </Box>
            <Box
              mt={"-30px"}
              ml={"320px"}
              backgroundColor={"red.400"}
              boxSize={"max-content"}
              padding={"5px"}
              borderRadius={"10px"}
              fontWeight={"bold"}
              color={"white"}
              fontFamily={"sans-serif"}
            >
              <Link to="/EmployeeLogin"> Login </Link>
            </Box>
            <Box p={"1"} />
            <Box
              textAlign={"center"}
              // fontFamily={"sans-serif"}
              // fontSize={"30px"}
              // fontWeight={"bold"}
            >
              <Heading>Employee Register Form</Heading>
            </Box>

            <FormControl isInvalid={formik.errors.Name} isRequired>
              <FormLabel>Employe Name</FormLabel>
              <Input
                name="Name"
                type={"name"}
                value={formik.values.Name}
                onChange={formChangeHandler}
                placeholder="Write Your Name"
                size={"lg"}
              />
            </FormControl>
            <FormControl isInvalid={formik.errors.Email} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="Email"
                type={"email"}
                value={formik.values.Email}
                onChange={formChangeHandler}
                placeholder="Write your email here"
                size={"lg"}
              />
            </FormControl>
            <FormControl isInvalid={formik.errors.Password} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={formik.values.Password}
                  onChange={formChangeHandler}
                  name="Password"
                  placeholder="Input your password"
                  size={"lg"}
                  type={showPassword ? "text" : "Password"}
                />

                <InputRightElement width={"4.5rem"}>
                  <Button
                    h={"1.5rem"}
                    size="sm"
                    mt={"-0.05px"}
                    onClick={tooglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.Password}</FormErrorMessage>
            </FormControl>

            <Button
              mt={"15px"}
              colorScheme={"linkedin"}
              onClick={formik.handleSubmit}
            >
              Add Employee
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}
export default EmployeeForm

import {
  Text,
  Box,
  Container,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  FormErrorMessageProps,
  useToast,
  HStack,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import {
  fillCurrentEmployee,
  fillEmployeeList,
  loginEmployee,
  logoutEmployee,
} from "../features/employee/employeeSlice"
import axios from "axios"

const EmployeeLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const employeeSelector = useSelector((state) => state.employee)
  const [error, setError] = useState(null)
  const toast = useToast()
  const dispatch = useDispatch()
  let navigate = useNavigate()

  // const employeeData = async (values) => {
  //   try {
  //     const response = await axios.fetch(
  //       "http://localhost:2000/EmployeeList",
  //       values
  //     )
  //     // dispacth(fillEmployeeList(response.data))
  //   } catch (err) {
  //     console.log(err)
  //     alert("Server error")
  //   }
  // }
  const fetchEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:2000/EmployeeList")

      dispatch(fillCurrentEmployee(response.data))
    } catch (err) {
      console.log(err)
      alert("Server Error! start db/employee.json ")
    }
  }
  const formik = useFormik({
    initialValues: {
      Name: "",
      Email: "",
      Password: "",
    },
    onSubmit: (values) => {
      let loginStatus = false
      employeeSelector.data.map((val) => {
        if (values.Email === val.Email && values.Password === val.Password) {
          console.log(val)
          loginStatus = true
          dispatch(loginEmployee(val))
          toast({ title: "Login Success", status: "success" })
          fetchEmployee()
        } else if (
          values.Email === val.Email &&
          values.Password !== val.Password
        ) {
          return toast({ title: "Wrong Password", status: "error" })
        } else if (
          values.Password === val.Password &&
          values.Email !== val.Email
        ) {
          return toast({ title: "Email doesnt Exist", status: "error" })
        }
      })
    },

    validationSchema: Yup.object({
      Email: Yup.string().email().required(),
      Password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
    // onSubmit: (values, action) => {
    //   alert(JSON.stringify(values, null, 2))
    //   action.resetForm()
    // },
  })

  const tooglePassword = () => {
    setShowPassword(!showPassword)
  }
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  const logoutBtnHandler = () => {
    dispatch(logoutEmployee())
  }
  useEffect(() => {
    fetchEmployee()
  }, [])

  return (
    <Container maxW={"container.lg"}>
      <Box>
        <Button
          onClick={logoutBtnHandler}
          size={"sm"}
          colorScheme={"red"}
          ml={"-100px"}
          mt={"10px"}
        >
          Logout
        </Button>
      </Box>
      <Box>
        <Text
          align={"center"}
          fontWeight={"bold"}
          fontSize={"30px"}
          mt={"-15px"}
        >
          Employee Login
        </Text>
      </Box>

      <Box ml={"250PX"} mt={"20px"} fontFamily={"unset"}>
        <Text>
          {" "}
          Hello {employeeSelector.loginEmployee.Name}, Here an Inforrmation
          about you !
        </Text>
        <Text>ID : {employeeSelector.loginEmployee.id}</Text>
        <Text>Name : {employeeSelector.loginEmployee.Name}</Text>
        <Text>Email : {employeeSelector.loginEmployee.Email} </Text>
        <Text>Password: {employeeSelector.loginEmployee.Password}</Text>
      </Box>

      <Box
        mt={"10px"}
        ml={"250px"}
        width={"500px"}
        height={"3--px"}
        p="8"
        mb="8"
        borderRadius="6px"
        border="solid 1px lightgrey"
      >
        <Text fontWeight="bold" fontSize="4xl" mb="8">
          Login Employee
        </Text>

        {/* {employeeSelector.fillCurrentEmployee.id ? null()} */}
        <form onSubmit={formik.handleSubmit}>
          <Stack>
            <FormControl isInvalid={formik.errors.Email}>
              <FormLabel>Email</FormLabel>
              <Input
                autoComplete="off"
                value={formik.values.Email}
                onChange={formChangeHandler}
                name="Email"
                type="email"
              />
              <FormErrorMessage>{formik.errors.Email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.errors.Password}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={formik.values.Password}
                  onChange={formChangeHandler}
                  name="Password"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={tooglePassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.Password}</FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              // onClick={formik.handleSubmit}
              colorScheme="twitter"
            >
              Login
            </Button>
          </Stack>
        </form>

        <Box>
          <Button
            onClick={() => navigate(-1)}
            size={"sm"}
            colorScheme={"whatsapp"}
            ml={"375px"}
            mt={"10px"}
          >
            Back
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default EmployeeLogin

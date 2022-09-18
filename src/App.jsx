// import logo from "./logo.svg"
// import "./App.css"

import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import TextPage from "./pages/TextPage"
import List from "./pages/List"
import Filter from "./pages/Filter"
import RegisterPage from "./pages/RegisterPage"
import StudentsCounter from "./pages/StudentsCounter"
import UserList from "./pages/UserList"
import ProductList from "./pages/ProductList"
import ProductEdit from "./pages/ProductEdit"
import EmployeeList from "./pages/EmployeeList"
import EmployeeForm from "./pages/EmployeeForm"
import EmployeeLogin from "./pages/EmployeeLogin"

import {
  ChakraProvider,
  Flex,
  Text,
  Box,
  Tabs,
  TabList,
  Tab,
} from "@chakra-ui/react"
import axios from "axios"
import {
  fillEmployeeList,
  fillCurrentEmployee,
  loginEmployee,
  logoutEmployee,
} from "./features/employee/employeeSlice"
import { useEffect } from "react"

const data = [
  {
    fullName: "Naruto",
    position: "Kucing",
    age: 100,
  },
  { fullName: "Doraemon", position: "Hokage", age: 17 },
  {
    fullName: "Bill",
    position: "CEO",
    age: 40,
  },
]

import Profile from "./components/Profile/index"
import ReduxCounter from "./pages/ReduxCounter"
import { useDispatch, useSelector } from "react-redux"
// import RegisterPage from "./pages/RegisterPage"

function App() {
  const renderProfiles = () => {
    let result = data.map((val) => {
      return (
        <Profile
          fullName={val.fullName}
          position={val.position}
          age={val.age}
        />
      )
    })
    return result
  }

  const counterSelector = useSelector((state) => state.counter)
  const studentSelector = useSelector((state) => state.students)

  const employeeSelector = useSelector((state) => state.employee)
  const dispatch = useDispatch()

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:2000/EmployeeList")
      dispatch(fillEmployeeList(response.data))
    } catch (err) {
      console.log(err)
      alert("Server error")
    }
  }
  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Box className="App">
      <Text
        fontSize="3xl"
        fontWeight={"bold"}
        fontFamily={"serif"}
        color={"blue.500"}
        align={"center"}
        justifyContent={"center"}
      >
        <Link to="App">Hello World</Link>
      </Text>
      {/* <Text align={"center"}>
        <b>Counter: {counterSelector.value}</b>
      </Text> */}

      <ChakraProvider>
        <Flex justify={"center"} boxSizing={"inherit"}>
          <Tabs size={"md"} varian={"enclosed"}>
            <TabList mb="1em">
              <Link to="/home">
                <Tab>Home</Tab>
              </Link>
              <Link to="/about">
                <Tab>About</Tab>
              </Link>
              <Link to="/counter">
                <Tab>Counter</Tab>
              </Link>
              <Link to="/text">
                <Tab>Text Area</Tab>
              </Link>
              <Link to="/list">
                <Text mt={"2"}>List</Text>
              </Link>
              <Link to="/filter">
                <Tab>Filter</Tab>
              </Link>
              <Link to="/RegisterPage">
                <Tab>Register Page</Tab>
              </Link>
              <Link to="/ReduxCounter">
                <Tab>Redux Counter</Tab>
              </Link>
              <Link to="/StudentsCounter">
                <Tab>Students Counter</Tab>
              </Link>
              <Link to="/UserList">
                <Tab>User List</Tab>
              </Link>
              <Link to="/ProductList">
                <Tab>Product List</Tab>
              </Link>
              {/* <Link to="/EmployeeList">
                <Tab>Employee List</Tab>
              </Link> */}
              <Link to="/EmployeeForm">
                <Tab>Employee Form</Tab>
              </Link>
              {/* <Link to="/EmployeeLogin">
                <Tab>Login</Tab>
              </Link> */}
            </TabList>
          </Tabs>
        </Flex>
      </ChakraProvider>

      {/* <UnorderedList>
        <ListItem>
          <Link to="/home">Home</Link>
        </ListItem>
        <ListItem>
          <Link to="/about">About</Link>
        </ListItem>
        <ListItem>
          <Link to="/counter">Counter</Link>
        </ListItem>
        <ListItem>
          <Link to="/text">Text Area</Link>
        </ListItem>
        <ListItem>
          <Link to="/list">List</Link>
        </ListItem>
        <ListItem>
          <Link to="/filter">Filter</Link>
        </ListItem>
        <ListItem>
          <Link to="/Registerpage">Register Page</Link>
        </ListItem>
      </UnorderedList> */}
      {/* {renderProfiles()} */}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/Registerpage" element={<RegisterPage />} />
        <Route path="/ReduxCounter" element={<ReduxCounter />} />
        <Route path="/StudentsCounter" element={<StudentsCounter />} />
        <Route path="/UserList" element={<UserList />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductEdit />} />
        <Route path="/EmployeeList" element={<EmployeeList />} />
        <Route path="/EmployeeForm" element={<EmployeeForm />} />
        <Route path="/EmployeeLogin" element={<EmployeeLogin />} />
      </Routes>
    </Box>
  )
}

export default App

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
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axiosInstance from "../api"

// API / SUMBER DATA
// https://jsonplaceholder.typicode.com/users

const UserList = () => {
  // state yang akan menyimpan data user dari API
  const [users, setUsers] = useState([])
  const toast = useToast()

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users")

      setUsers(response.data)
    } catch (err) {
      console.log(err)
      toast({
        title: "Network Error",
        status: "error",
      })
    }
  }

  const renderUsers = () => {
    return users.map((val) => {
      return (
        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.username}</Td>
          <Td>{val.email}</Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Box>
      <Text fontWeight={"bold"} align={"center"} fontSize={"36px"}>
        User List
      </Text>
      <Button colorScheme={"twitter"} onClick={fetchUsers} mt={"5px"}>
        Fetch Data
      </Button>
      <Table variant={"striped"} colorScheme={"twitter"}>
        <Thead colorScheme={"twitter"}>
          <Tr fontSize={"50px"} fontWeight={"bold"}>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>

        <Tbody overflowY={"auto"} maxHeight={"50px"}>
          {renderUsers()}
        </Tbody>
      </Table>
    </Box>
  )
}

export default UserList

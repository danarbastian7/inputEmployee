import { useState } from "react"
import {
  Text,
  Box,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Radio,
  HStack,
  RadioGroup,
  useToast,
  Stack,
  GridItem,
  Grid,
  Icon,
  IconButton,
} from "@chakra-ui/react"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  // const handleClick = () => setShow(!show)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [gender, setGender] = useState("")
  // const [currentEmail, setCurrentEmail] = useState("")
  // const [currentUser, setCurrentUser] = useState("")
  // const [currentPassword, setCurrentPassword] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { modalIsOpen, setModalIsOpen } = useState(false)

  // const [modalIsOpen, setModalIsOpen] = useState(false)

  const [users, setUsers] = useState([
    {
      name: "",
      email: "",
      password: "",
      gender: "",
    },
  ])
  const toast = useToast()

  const tooglePassword = () => {
    setShowPassword(!showPassword)
  }

  const submitBtnHandler = () => {
    // setCurrentEmail(email)
    // setCurrentUser(name)
    // setCurrentPassword(password)

    if (name.length >= 3 && email && password.length >= 8 && gender) {
      onOpen(true)
      for (let user of users) {
        if (user.email === email || user.name === name) {
          toast({
            title: "Username or email hase been used",
            status: "error",
          })
          return
        }
      }
      // setModalIsOpen(true)

      let newUser = {
        name,
        password,
        email,
        gender,
      }
      setUsers([...users, newUser])

      setName("")
      setEmail("")
      setPassword("")
      setGender("")
    } else {
      toast({
        title: "From is still invalid",
        status: "error",
      })
    }
  }
  const closeModal = () => {
    setModalIsOpen(false)
  }

  const deleteUserBtnHandlr = (idx) => {
    let tempUsers = [...users]
    tempUsers.splice(idx, 1)

    setUsers(tempUsers)
  }

  const renderUsers = () => {
    return users.map((val, idx) => {
      return (
        <Stack
          spacing={4}
          border="1px solid black"
          borderRadius="8px"
          padding="12px"
        >
          <Text>Username: {val.name}</Text>
          <Text>Email: {val.email}</Text>
          <Text>Password: {val.password}</Text>
          <Text>Gender: {val.gender}</Text>
          <Button
            onClick={() => deleteUserBtnHandlr(idx)}
            colorScheme="red"
            width={"auto"}
          >
            Delete
          </Button>
        </Stack>
      )
    })
  }

  return (
    // <Flex
    //   // flexDirection={"column"}
    //   width={"100wh"}
    //   height={"50vh"}
    //   align={"left"}
    //   justifyContent={"center"}
    // >
    <Grid templateColumns="repeat(2,1fr)" gap={4}>
      <GridItem>
        <Box
          w={["full", "md"]}
          height={"475px"}
          p={[9, 10]}
          marginLeft={"500px"}
          marginTop={"20px"}
          // mt={[20, "30vh"]}
          // mx="auto"
          border={["none", "1px"]}
          borderColor={["", "blue.300"]}
          borderRadius={[10]}
          align={"center"}
          justifyItems={"center"}
        >
          <Box p={"2"} />
          <Box textAlign={"center"} fontFamily={"cursive  "}>
            <Heading>Register</Heading>
          </Box>

          <FormControl isRequired>
            <FormLabel>User Name</FormLabel>
            <Input
              type={"name"}
              placeholder="Write Your Name"
              size={"lg"}
              onChange={(event) => setName(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type={"email"}
              placeholder="Write your email here"
              size={"lg"}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Input your password"
                size={"lg"}
                onChange={(event) => setPassword(event.target.value)}
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
          </FormControl>

          <Text align={"left"} isRequired>
            Gender
          </Text>
          <RadioGroup
            onChange={(value) => setGender(value)}
            value={gender}
            isRequired
          >
            <HStack direction={"row"}>
              <Radio value={"Male"}>Male</Radio>
              <Radio value={"Female"}>Female</Radio>
            </HStack>
          </RadioGroup>

          <Button
            width={"full"}
            mt={4}
            type="submit"
            backgroundColor={"twitter.100"}
            variant={"box"}
            onClick={submitBtnHandler}
          >
            Register
          </Button>
        </Box>
      </GridItem>
      <GridItem
        height="68vh"
        overflowY="scroll"
        marginTop={"20px"}
        marginRight={"50px"}
        letterSpacing={"normal"}
        gridColor
      >
        <Stack>{renderUsers()}</Stack>
      </GridItem>

      {/* <RegisterModal
        isOpen={modalIssOpen}
        closeModal={closeModal}
        usernmae={name}
        email={email}
        password={password}
        gender={gender}
      /> */}

      <Modal isOpen={modalIsOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Username: {name} </Text>
            <Text>Email: {email}</Text>
            <Text>Password: {password}</Text>
            <Text>Gender: {gender}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme={"blue"} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Grid>
    // </Flex>
  )
}

export default Register

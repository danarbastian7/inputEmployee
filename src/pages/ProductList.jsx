import {
  Box,
  Container,
  Tbody,
  Text,
  Thead,
  Tr,
  Th,
  Table,
  useToast,
  Button,
  GridItem,
  FormControl,
  Grid,
  FormLabel,
  Input,
  Td,
  FormErrorMessage,
  Center,
  _activeLink,
} from "@chakra-ui/react"
import * as Yup from "yup"
import { useState, useEffect } from "react"
import { jsonServerApi } from "../api"
import Axios from "axios"
import { useFormik } from "formik"
import axios from "axios"
import { Link } from "react-router-dom"
import ProductEdit from "./ProductEdit"

const ProductList = () => {
  const [product, setProduct] = useState([])
  const toast = useToast()

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:2000/products")
      setProduct(response.data)
    } catch (err) {
      console.log(err)
      toast({
        title: "Network Error",
        status: "error",
      })
    }
  }
  const deleteBtnHandler = async (id) => {
    try {
      await axios.delete(`http://localhost:2000/products/${id}`)
      fetchProducts()
      toast({ title: "Product Deleted", status: "info" })
    } catch (err) {
      concole.log(err)
    }
  }

  const renderProducts = () => {
    return product.map((val) => {
      return (
        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.product_name}</Td>

          <Td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price)}
          </Td>
          <Td>{val.stock}</Td>
          <Td>
            <Link to={`/products/${val.id}`}>
              <Button mx={1} colorScheme={"green"} mr={"1px"}>
                Edit
              </Button>
            </Link>
          </Td>
          <Td>
            <Button
              mx={1}
              ml={"1px"}
              colorScheme={"red"}
              onClick={() => deleteBtnHandler(val.id)}
            >
              Delete
            </Button>
          </Td>
        </Tr>
      )
    })
  }
  useEffect(() => {
    fetchProducts()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      stock: 0,
    },
    onSubmit: async (values) => {
      try {
        const { product_name, price, stock } = formik.values
        let newProduct = {
          product_name: product_name,
          price: price,
          stock: stock,
        }
        await axios.post("http://localhost:2000/products", newProduct)
        fetchProducts()
        toast({ title: "Product Added", status: "success" })
      } catch (err) {
        toast({ title: "Network Error", status: "error" })
        console.log(err)
      }
    },
    validationSchema: Yup.object({
      product_name: Yup.string("").required(),
      price: Yup.number().required().min(1000).max(100000),
      stock: Yup.number().required().min(1),
    }),
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Container maxW={"container.lg"}>
      <Container>
        <Text fontWeight={"bold"} fontSize={"4xl"} align={"center"} mb={"25px"}>
          Product List
        </Text>
      </Container>
      <Button
        disabled={formik.isSubmitting}
        colorScheme={"linkedin"}
        onClick={formik.handleSubmit}
      >
        Add Product
      </Button>
      <Grid templateColumns="repeat(3, 1fr)" gap={"4"} mt={"auto"}>
        <GridItem>
          <FormControl isInvalid={formik.errors.product_name} isRequired>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="product_name"
              onChange={formChangeHandler}
              //   onChange={(event) =>
              //     formik.setFieldValue("product_name", event.target.value)
              //   }
            />
            <FormErrorMessage>product Name must be filled</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={formik.errors.price} isRequired>
            <FormLabel>Product Price</FormLabel>
            <Input name="price" onChange={formChangeHandler} type={"number"} />
            <FormErrorMessage>{formik.errors.price}</FormErrorMessage>
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl isInvalid={formik.errors.stock} isRequired>
            <FormLabel>Product Stock (Kg)</FormLabel>
            <Input name="stock" onChange={formChangeHandler} type={"number"} />
            <FormErrorMessage>{formik.errors.stock}</FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>
      <Table mt={"auto"} variant={"striped"} colorScheme={"twitter"}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
            <Th colSpan={1} align={"Center"}>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>{renderProducts()}</Tbody>
      </Table>
      <br />
      <Button
        onClick={fetchProducts}
        backgroundColor={"whatsapp.500"}
        _hover={"white"}
        textAlign={"center"}
        ml={"auto"}
        mt={"65px"}
      >
        Fetch Data
      </Button>
    </Container>
  )
}

export default ProductList

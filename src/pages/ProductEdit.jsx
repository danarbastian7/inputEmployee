import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Form, useFormik } from "formik"
import { jsonServerApi } from "../api"
import { Formik } from "formik"

const ProductEdit = () => {
  const params = useParams()
  const toast = useToast()
  const [product, setProduct] = useState({})

  const fetchProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/products/${params.id}`
      )
      setProduct(response.data)

      formik.setFieldValue("product_name", response.data.product_name)
      formik.setFieldValue("price", response.data.price)
      formik.setFieldValue("stock", response.data.stock)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    fetchProduct()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      stock: 0,
    },
    onSubmit: async ({ product_name, price, stock }) => {
      try {
        let newProduct = {
          product_name,
          price: Number(price),
          stock: Number(stock),
        }
        await axios.patch(
          `http://localhost:2000/products/${product.id}`,
          newProduct
        )
        fetchProduct()
        toast({ title: "Product Added", status: "success" })
      } catch (err) {
        toast({ title: "Network Error", status: "error" })
        console.log(err)
      }
    },
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  return (
    <Box>
      <Container
        maxW="container.lg"
        w={"500px"}
        align={"center"}
        padding={"10px"}
        ringColor={"blue.500"}
      >
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input
            onChange={formChangeHandler}
            defaultValue={product.product_name}
            name="product_name"
          />
        </FormControl>
        <FormControl>
          <FormLabel>
            Price
            <Input
              onChange={formChangeHandler}
              defaultValue={product.price}
              name="price"
              type={"number"}
            />
          </FormLabel>
        </FormControl>
        <FormControl>
          <FormLabel>
            Stock
            <Input
              onChange={formChangeHandler}
              defaultValue={product.stock}
              name="stock"
              type={"number"}
            />
          </FormLabel>
        </FormControl>
        <Button onClick={formik.handleSubmit}>Edit Data</Button>
      </Container>
    </Box>
  )
}

export default ProductEdit

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "./../components/ui/color-mode";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        type: "error",
        tittle: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        tittle: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: "", image: "" });
  };

  return (
    <>
      <Container maxW={"container.sm"}>
        <VStack gap={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Create New Product
          </Heading>
          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            p={8}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack gap={6} p={4}>
              <Input
                placeholder="Product Name"
                name="name"
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                type="text"
                value={newProduct.image}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </VStack>
            <Center pt={2}>
              <Button background="blue.400" onClick={handleAddProduct} w="80vh">
                Add Product
              </Button>
            </Center>
          </Box>
        </VStack>
      </Container>
      ;
    </>
  );
};

export default CreatePage;

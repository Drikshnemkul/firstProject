import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useColorModeValue } from "./ui/color-mode";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();

  const [open, setOpen] = useState(false);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    console.log(pid);

    setOpen(false);
    if (!success) {
      toaster.create({
        type: "error",
        title: "Error",
        description: message,
        duration: 3000,
        isClosable: true,
      });
    } else {
      toaster.create({
        type: "success",
        title: "Success",
        description: "Product updated successfully",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product?.image}
        alt={product?.name}
        h={48}
        w="full"
        objectFit="cover"
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product?.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product?.price}
        </Text>

        <HStack gap={2}>
          <IconButton
            colorPalette="teal"
            variant="solid"
            onClick={() => setOpen(true)}
          >
            <FaEdit />
          </IconButton>

          <IconButton
            colorPalette="red"
            variant="solid"
            onClick={() => handleDeleteProduct(product._id)}
          >
            <AiFillDelete />
          </IconButton>
        </HStack>
      </Box>

      <DialogRoot lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Product</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <VStack gap={"4"}>
              <Input
                placeholder="Product Name"
                name="name"
                value={updatedProduct?.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                value={updatedProduct?.price}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                placeholder="Image URL"
                name="image"
                value={updatedProduct?.image}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </DialogBody>
          <DialogFooter>
            <Button
              colorPalette={"teal"}
              variant="solid"
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>

            <DialogActionTrigger asChild>
              <Button
                colorPalette={"red"}
                variant="solid"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </DialogActionTrigger>
          </DialogFooter>

          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
};

export default ProductCard;

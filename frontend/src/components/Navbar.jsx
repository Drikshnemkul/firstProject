import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { useColorMode } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Container maxW={"1140px"} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexDir={{ base: "column", sm: "row" }}
        >
          <Text
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bg={"linear-gradient(to right, cyan, blue)"}
            backgroundClip={"text"}
            // color="blue.500"
            // _hover={{ color: "cyan.500" }}
          >
            <Link to={"/"}>Product Store 🛒</Link>
          </Text>

          <HStack gap={2} alignItems={"center"}>
            <Link to={"/create"}>
              <Button size={"xs"}>
                <FaPlus />
              </Button>
            </Link>
            <Button size={"xs"} onClick={toggleColorMode}>
              {colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </div>
  );
};

export default Navbar;

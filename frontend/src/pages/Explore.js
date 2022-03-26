import {
  Box,
  Text,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import Card from "../components/Card";
import SidebarWithHeader from "../components/SidebarWithHeader.tsx";


const Explore = () => {
  return (
    <>
      <Box position="absolute" width="full" zIndex="1">
        <SidebarWithHeader />
      </Box>
      <Box postion="absolute" pl="16%" pt="20">
      <VStack>
      <HStack justifyContent="space-evenly" spacing={10}>
        <Card/>
        <Card/>
        <Card/>
      </HStack> 
      <HStack justifyContent="space-evenly" spacing={10}>
        <Card/>
        <Card/>
        <Card/>
      </HStack> 
      </VStack>       
      </Box>
    </>
  );
};

export default Explore;

import React from 'react'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'

import {
    Box,
    Text,
    Center,
    useColorModeValue,
    Heading,
    Stack,
    Image,
    Icon,
  } from "@chakra-ui/react";
const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";


const Card = () => {
  return (
    <>
        <Box py={12}>
          <Box
            role={"group"}
            p={6}
            maxW={"330px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={1}
          >
            <Box
              rounded={"lg"}
              mt={-12}
              pos={"relative"}
              height={"230px"}
              _after={{
                transition: "all .3s ease",
                content: '""',
                w: "full",
                h: "full",
                pos: "absolute",
                top: 5,
                left: 0,
                backgroundImage: `url(${IMAGE})`,
                filter: "blur(15px)",
                zIndex: -1,
              }}
              _groupHover={{
                _after: {
                  filter: "blur(20px)",
                },
              }}
            >
              <Image
                rounded={"lg"}
                height={220}
                width={282}
                objectFit={"cover"}
                src={IMAGE}
              />
            </Box>
            <Stack pt={10} align={"center"} alignItems="left"  justifyContent="flex-end">
              <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={800} color={"#241432"}>
                Havana
              </Heading>
              <Text
                fontSize={"sm"}
                textTransform={"uppercase"}
                color={"#D57FA7"}
                fontWeight={550}
              >
                Camila Cabello
              </Text>
              

            <AiOutlineHeart fontSize={25} />
              <Stack direction={"row"} align={"left"}>
                <Text fontWeight={800} fontSize={"xl"}>
                  $57
                </Text>
                {/* <Text textDecoration={"line-through"} color={"gray.600"}>
                  $199
                </Text> */}
              </Stack>
            </Stack>
          </Box>
        </Box>
    </>
  )
}

export default Card
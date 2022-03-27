import React, { useEffect, useState } from "react";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";

import {
  Box,
  Text,
  Center,
  useColorModeValue,
  Heading,
  Stack,
  Image,
  Icon,
  HStack,
  Button,
} from "@chakra-ui/react";
import { AudioPlayer } from "./AudioPlayer";
import { FaEthereum } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const IMAGE =
  "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

const Card = ({
  imageSrc,
  songSrc,
  price,
  name,
  sellerAddr,
  preview,
  tokenID,
  sellingState,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

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
              src={imageSrc}
            />
          </Box>
          <Stack
            pt={10}
            align={"center"}
            alignItems="left"
            justifyContent="flex-end"
          >
            <HStack>
              <Heading
                fontSize={"2xl"}
                fontFamily={"body"}
                fontWeight={800}
                color={"#241432"}
              >
                {name}
              </Heading>

              {isLiked ? (
                <AiFillHeart
                  onClick={() => setIsLiked(!isLiked)}
                  fontSize={25}
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => setIsLiked(!isLiked)}
                  fontSize={25}
                />
              )}
            </HStack>
            <Text
              fontSize={"sm"}
              textTransform={"uppercase"}
              color={"#D57FA7"}
              fontWeight={550}
            >
              {sellerAddr}
            </Text>

            <Stack direction={"row"} align={"left"}>
              <HStack>
                <Text fontWeight={800} fontSize={"xl"} marginRight={120}>
                  <HStack>
                    <Text>{price}</Text>
                    <FaEthereum />
                  </HStack>
                </Text>
                <Button
                  marginInlineEnd={"-14px"}
                  onClick={(e) =>
                    navigate(`/buy/${tokenID}`, { state: { price: price } })
                  }
                >
                  {sellingState ? "Sell Now" : "Buy Now"}
                  <AiOutlineShoppingCart />
                </Button>
              </HStack>
            </Stack>
            <Box w={10}>
              {songSrc && <AudioPlayer preview={preview} songSrc={songSrc} />}
            </Box>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Card;

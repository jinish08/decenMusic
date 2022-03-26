import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  useColorModeValue,
  Box,
  Image,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";

const mystyle = {
  overflow: "hidden",
};

const Form = () => {
  const [name, setName] = useState("");
  const [copies, setCopies] = useState("0");
  const [lyrics, setLyrics] = useState("");
  const [tags, setTags] = useState("");
  const [onFocus, setOnFocus] = useState(false);

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(
      "Name :",
      name,
      "copies :",
      copies,
      "lyrics :",
      lyrics,
      "tags :",
      tags
    );
    setName("");
    setCopies(0);
    setLyrics("");
    setTags("");
    setOnFocus(false);
  };
  return (
    <Box bgColor={"#241432"} style={mystyle} overflowY="hidden">
      <Image
        src="assets/formextra4.svg"
        alt="hero"
        width="3xl"
        position="absolute"
        zIndex="20"
        right="81"
        top="-200"
      />
      <Box
        ml={"300"}
        role={"group"}
        p={8}
        my={20}
        maxW={"900px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"lg"}
        zIndex={1}
      >
        <Heading mx="auto" mb={7}>
          Submit your form
        </Heading>
        <Box mr={10}>
          <FormControl mb={"7"}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              w={"40%"}
              id="name"
              type="name"
              onChange={(event) => {
                setName(event.target.value);
              }}
              value={name}
            />
          </FormControl>
          <FormControl mb={"7"}>
            <FormLabel htmlFor="audio">Audio</FormLabel>
            <Input w={"40%"} id="audio" type="file" accept="audio/mpeg3" />
          </FormControl>
          <FormControl mb={"7"}>
            <FormLabel htmlFor="audio">Image</FormLabel>
            <Input w={"40%"} id="audio" type="file" accept="image/*" />
          </FormControl>
          <FormControl mb={"7"}>
            <FormLabel htmlFor="link">Number Of Copies</FormLabel>
            {/* <NumberInput
              w={"40%"}
              id="link"
              defaultValue={1}
              min={1}
              onChange={(event) => {
                setCopies(event.target.value);
              }}
              value={copies}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput> */}
            <input
              type="number"
              name="copies"
              id="link"
              onChange={(event) => {
                setCopies(event.target.value);
              }}
              onFocus={() => {
                if (!onFocus) {
                  setCopies("");
                  setOnFocus(true);
                }
              }}
              style={{
                width: "40%",
                height: "30px",
                border: "0.5px solid #D4DDE7",
                borderRadius: "5px",
              }}
              value={copies}
            />
            {/* <FormHelperText w={"50%"}>
              OpenSea will include a link to this URL on this item's detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.
            </FormHelperText> */}
          </FormControl>
          <FormControl mb={"7"}>
            <FormLabel htmlFor="lyrics">Lyrics</FormLabel>
            <Textarea
              w={"40%"}
              id="lyrics"
              type="textArea"
              onChange={(event) => {
                setLyrics(event.target.value);
              }}
              value={lyrics}
            />
            <FormHelperText w={"50%"}>
              Provide the lyrics to your song
            </FormHelperText>
          </FormControl>
          <FormControl mb={"7"}>
            <FormLabel htmlFor="tags">Tags</FormLabel>
            <Input
              w={"40%"}
              id="tags"
              type="tags"
              onChange={(event) => {
                setTags(event.target.value);
              }}
              value={tags}
            />
            <FormHelperText w={"50%"}>
              Add tags for your songs to allow users to easily search for your
              creation
            </FormHelperText>
          </FormControl>
          <Button
            mt={4}
            colorScheme="teal"
            type="submit"
            mt="2"
            size="lg"
            px="8"
            fontSize="2xl"
            colorScheme="brand"
            borderRadius="2xl"
            style={{
              boxShadow: "0px 4px 20px 8px #785fbb",
              border: "2px solid white",
            }}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;

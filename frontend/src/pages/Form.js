import { Heading, FormControl,
    FormLabel, Input,
    FormHelperText, useColorModeValue, 
    Box, Image} from '@chakra-ui/react'
import React from 'react'


const mystyle={
    overflow: 'hidden'
};

const Form = () => {
  return (
    <Box 
    bgColor={"#241432"}
    style={mystyle}
    overflowY='hidden'
    >
    <Image src="assets/formextra4.svg" alt="hero" width="3xl" position="absolute"  zIndex="20" right="81" top="-200"/>
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
        <Heading mx="auto" mb={7}>Submit your form</Heading>
        <Box mr={10}>
            <FormControl mb={"7"}>
            <FormLabel htmlFor='name'>Name</FormLabel>
                <Input w={"40%"} id='name' type='name' />
            </FormControl>
            <FormControl mb={"7"}>
            <FormLabel htmlFor='audio'>Audio</FormLabel>
                <Input w={"40%"} id='audio' type='file' />
            </FormControl>
            <FormControl mb={"7"}>
                <FormLabel htmlFor='link'>External Link</FormLabel>
                <Input w={"40%"} id='link' type='link' />
                <FormHelperText w={"50%"}>OpenSea will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</FormHelperText>
            </FormControl>
            <FormControl mb={"7"}>
                <FormLabel htmlFor='lyrics'>Lyrics</FormLabel>
                <Input w={"40%"} id='lyrics' type='lyrics' />
                <FormHelperText w={"50%"}>Provide the lyrics to your song</FormHelperText>
            </FormControl>
            <FormControl mb={"7"}>
                <FormLabel htmlFor='tags'>Tags</FormLabel>
                <Input w={"40%"} id='tags' type='tags' />
                <FormHelperText w={"50%"}>Add tags for your songs to allow users to easily search for your creation</FormHelperText>
            </FormControl>
        </Box>
    </Box>
    </Box>
  )
}

export default Form
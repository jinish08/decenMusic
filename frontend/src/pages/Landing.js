import { Box, Button, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../providers/userContext';
// import bg from "./assets/landbg.svg"

const Landing = () => {
	const { connectWallet, currentAccount } = useContext(UserContext);

	if (currentAccount) {
		return <Navigate to={'/explore'} />;
	}

	return (
		<Box>
			<Image
				zIndex="-1"
				position="absolute"
				src="/assets/landbg.svg"
				height="100vh"
				width="100vw"
				objectFit="cover"
				alt="Dan Abramov"
				left="0"
				top="0"
			/>
			<Image
				src="assets/hero.svg"
				alt="hero"
				width="5xl"
				position="absolute"
				zIndex="20"
				right="0"
				top="32"
			/>
			<Box pl="32" pt="40">
				<Text fontSize="6xl" fontWeight="bold" color="white" textAlign="left">
					Feel the
				</Text>
				<Text
					fontSize="6xl"
					mt="-5"
					fontWeight="bold"
					color="white"
					textAlign="left"
				>
					music with us
				</Text>
				<Button
					mt="12"
					size="lg"
					px="8"
					fontSize="2xl"
					colorScheme="brand"
					borderRadius="2xl"
					style={{
						boxShadow: '0px 4px 20px 8px #785fbb',
						border: '2px solid white',
					}}
					onClick={connectWallet}
				>
					Connect Now
				</Button>
			</Box>
		</Box>
	);
};

export default Landing;

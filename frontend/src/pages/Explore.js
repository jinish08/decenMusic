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
	SimpleGrid,
	Flex,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import SidebarWithHeader from '../components/SidebarWithHeader.tsx';
import { UserContext } from '../providers/userContext';

const Explore = () => {
	const { getAllNFTs, allNFTs } = useContext(UserContext);

	useEffect(() => {
		getAllNFTs();
	}, []);

	return (
		<>
			<Image
				zIndex="-1"
				position="absolute"
				src="/assets/explorebg.svg"
				height="100vh"
				width="100vw"
				objectFit="cover"
				alt="Dan Abramov"
				left="0"
				top="0"
			/>
			<Box position="absolute" width="full" zIndex="1">
				<SidebarWithHeader />
			</Box>
			<Box postion="absolute" pl="16%" pt="20">
				<VStack>
					<Flex flexWrap={'wrap'} justifyContent={'space-evenly'}>
						{allNFTs.length == 0 ? (
							<Text fontSize={'4xl'}>No items</Text>
						) : (
							allNFTs?.map((i) => (
								<Card
									songSrc={i.song}
									imageSrc={i.image}
									seller={i.seller}
									price={i.price}
								/>
							))
						)}
					</Flex>
				</VStack>
			</Box>
		</>
	);
};

export default Explore;

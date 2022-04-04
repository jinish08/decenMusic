import { Spinner, Text } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import SidebarWithHeader from '../components/SidebarWithHeader.tsx';
import { UserContext } from '../providers/userContext';
import { VStack, Flex, Box, Image } from '@chakra-ui/react';

const MyNft = () => {
	const { getMyNFTs, myNfts, loading } = useContext(UserContext);
	useEffect(() => {
		getMyNFTs();
	}, []);

	return (
		<>
			<Image
				zIndex="-1"
				position="absolute"
				src="/assets/mynftbg.svg"
				height="100vh"
				width="100vw"
				objectFit="cover"
				alt="Dan Abramov"
				left="0"
				top="0"
			/>
			<div>
				<SidebarWithHeader />
				{/* <Box postion="absolute" pl="16%" pt="20" top="10" left="0">
        <VStack> */}
				{loading ? (
					<Spinner
						mt="25px"
						ml="3"
						thickness="20px"
						speed="0.65s"
						emptyColor="gray.200"
						color={'#241432'}
						size="4xl"
						position={'absolute'}
						top="150px"
						left="350px"
					/>
				) : myNfts?.length === 0 ? (
					<Text
						fontSize={'4xl'}
						color="black"
						ml="500px"
						position={'absolute'}
						top="150px"
						left="200px"
					>
						No items
					</Text>
				) : (
					<div style={{ position: 'absolute', top: '150px', left: '280px' }}>
						<Flex flexWrap={'wrap'} justifyContent="space-evenly">
							{myNfts?.map((i) => (
								<div style={{ marginRight: '20px' }}>
									<Card
										songSrc={i.song}
										imageSrc={i.image}
										seller={i.seller}
										price={i.price}
										tokenID={i.tokenId}
										preview={false}
										sellingState={true}
										name={i.name}
									/>
								</div>
							))}
						</Flex>
					</div>
				)}
				{/* </VStack>
      </Box> */}
			</div>
		</>
	);
};

export default MyNft;

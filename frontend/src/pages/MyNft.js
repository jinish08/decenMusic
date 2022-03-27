import { Text } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import SidebarWithHeader from '../components/SidebarWithHeader.tsx';
import { UserContext } from '../providers/userContext';
import { VStack, Flex, Box, Image } from '@chakra-ui/react';

const MyNft = () => {
	const { getMyNFTs, myNfts } = useContext(UserContext);
	useEffect(() => {
		getMyNFTs();
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
			<div>
				<SidebarWithHeader />
				{/* <Box postion="absolute" pl="16%" pt="20" top="10" left="0">
        <VStack> */}
				{myNfts.length === 0 ? (
					<Text fontSize={'4xl'}>No items</Text>
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

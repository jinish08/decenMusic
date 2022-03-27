import { Text } from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import SidebarWithHeader from '../components/SidebarWithHeader.tsx';
import { UserContext } from '../providers/userContext';

const MyNft = () => {
	const { getMyNFTs, myNfts } = useContext(UserContext);
	useEffect(() => {
		getMyNFTs();
	}, []);
	return (
		<div>
			<SidebarWithHeader />
			{myNfts.length === 0 ? (
				<Text fontSize={'4xl'}>No items</Text>
			) : (
				myNfts?.map((i) => (
					<Card
						songSrc={i.song}
						imageSrc={i.image}
						seller={i.seller}
						price={i.price}
						tokenID={i.tokenId}
					/>
				))
			)}
		</div>
	);
};

export default MyNft;

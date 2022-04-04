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
	InputGroup,
	InputLeftElement,
	Input,
	Spinner,
} from '@chakra-ui/react';
import React, { useContext, useEffect } from 'react';
import Card from '../components/Card';
import SidebarWithHeader from '../components/SidebarWithHeader.tsx';
import { UserContext } from '../providers/userContext';
import {
	collection,
	doc,
	updateDoc,
	getDoc,
	getDocs,
	query,
	where,
	increment,
} from 'firebase/firestore';
import { db } from '../utils/firebase-config';
import { FiSearch } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';

const Explore = () => {
	const { getAllNFTs, allNFTs, currentAccount, loading } =
		useContext(UserContext);

	useEffect(() => {
		getAllNFTs();
		getUser();
	}, []);

	console.log(allNFTs);
	const [searchTerm, setSearchTerm] = React.useState('');

	useEffect(() => {
		//   console.log(searchTerm)
	}, [searchTerm]);

	const getUser = async () => {
		try {
			const userRef = collection(db, 'user');
			const q = query(userRef, where('address', '==', 'abcdef'));
			const querySnapshot = await getDocs(q);
			const userID = querySnapshot.docs[0].id;
			console.log(userID);
			const userDoc = doc(db, 'user', userID);
			const docSnap = await getDoc(userDoc);
			console.log(docSnap.data());
		} catch (error) {
			console.log(error);
		}
	};

	if (!currentAccount) {
		return <Navigate to="/" />;
	}

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
				<SidebarWithHeader
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
				/>
			</Box>
			<Box postion="absolute" pl="16%" pt="20">
				<InputGroup w={64} ml="39" zIndex={1}>
					<InputLeftElement
						pointerEvents="none"
						children={<FiSearch color="gray.300" />}
					/>
					<Input
						bgColor={'purple.300'}
						type="tel"
						placeholder="search"
						color={'white'}
						style={{ color: 'white' }}
						_placeholder={{ color: 'white' }}
						onChange={(event) => {
							setSearchTerm(event.target.value);
						}}
						_focus={{ outline: 'none' }}
					/>
				</InputGroup>
				<VStack ml="30">
					<Flex flexWrap={'wrap'} width={'100%'} gap="20">
						{loading ? (
							<Spinner
								mt="25px"
								ml="3"
								thickness="20px"
								speed="0.65s"
								emptyColor="gray.200"
								color={'#241432'}
								size="4xl"
							/>
						) : allNFTs.length === 0 ? (
							<Text fontSize={'4xl'}>No items</Text>
						) : (
							allNFTs
								?.filter((val) => {
									if (searchTerm == '') {
										return val;
									} else if (
										val.name.toLowerCase().includes(searchTerm.toLowerCase())
									) {
										return val;
									}
								})
								.map((i) => (
									<Card
										songSrc={i.song}
										preview={true}
										imageSrc={i.image}
										seller={i.seller}
										price={i.price}
										tokenID={i.tokenId}
										name={i.name}
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

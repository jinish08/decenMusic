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
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useState } from 'react';
import { create as ipfsHttpClient } from 'ipfs-http-client';
import { getMarketContractWrite, getNftContractWrite } from '../utils';
import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../providers/userContext';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../utils/firebase-config';
import toast from 'react-hot-toast';

const mystyle = {
	overflow: 'hidden',
};

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');

const Form = () => {
	const [name, setName] = useState('');
	const [copies, setCopies] = useState('1');
	const [lyrics, setLyrics] = useState('');
	const [tags, setTags] = useState('');
	const [onFocus, setOnFocus] = useState(false);
	const [songUrl, setSongUrl] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [loading, setLoading] = useState('');
	const [price, setPrice] = useState(0);
	const { currentAccount } = useContext(UserContext);

	const navigate = useNavigate();

	const handleMusic = async (e) => {
		if (!e.target.files[0]) {
			console.log('No file uploaded');
			return;
		}
		const file = e.target.files[0];
		console.log('Song', file);
		try {
			setLoading('Uploading music');
			const added = await client.add(file, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			console.log('url--', url);
			setSongUrl(url);
			setLoading('');
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	};

	const handleImage = async (e) => {
		if (!e.target.files[0]) {
			console.log('No file uploaded');
			return;
		}
		const file = e.target.files[0];
		console.log('Image', file);
		try {
			setLoading('Uploading Image...');
			const added = await client.add(file, {
				progress: (prog) => console.log(`received: ${prog}`),
			});
			const url = `https://ipfs.infura.io/ipfs/${added.path}`;
			console.log('url--', url);
			setLoading('');
			setImageUrl(url);
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	};

	const submitHandler = async (event) => {
		event.preventDefault();

		const data = JSON.stringify({
			name,
			totalCopies: copies,
			lyrics,
			tags,
			image: imageUrl,
			song: songUrl,
			author: currentAccount,
		});

		try {
			setLoading('Loading...');

			const added = await toast.promise(client.add(data), {
				loading: 'Uploading to ipfs',
				success: 'Successfully Uploaded to ipfs!',
				error: 'Error uploading please try again in 2min',
			});

			const url = `https://ipfs.infura.io/ipfs/${added.path}`;

			const nftContract = getNftContractWrite();
			const marketContract = getMarketContractWrite();
			console.log('fdsafdsafdsfsdfsad', url);
			console.log('compies', copies);
			let transaction = await toast.promise(
				nftContract.createToken(copies, url),
				{
					loading: 'Minting NFT',
					success: 'NFT Minted',
					error: 'Error creating NFT',
				},
				{
					success: {
						icon: '🔥',
					},
				}
			);
			console.log('creating nft', transaction);
			let tx = await toast.promise(transaction.wait(), {
				loading: 'Minning transaction, Hold tight!',
				success: 'Minned successfully !',
				error: 'please wait 5 min and try again',
			});
			console.log('Transaction dfdasfdasfdsaffsaf', tx);
			const event = tx.events[1];
			console.log('Events', event);
			let value = event.args[0];
			const tokenID = value.toNumber();
			console.log('Token ID', tokenID);
			const acutalPrice = ethers.utils.parseUnits(price, 'ether');

			transaction = await toast.promise(
				marketContract.createMarketItem(
					contractAddress.nftAddress,
					tokenID,
					copies,
					acutalPrice
				),
				{
					loading: 'Publishing your song',
					success: 'Your song is published!',
					error: 'please wait 5 min and try again',
				},
				{
					success: {
						icon: '🔥',
					},
				}
			);

			await toast.promise(transaction.wait(), {
				loading: 'Minning transaction, Hold tight!',
				success: 'Minned successfully !',
				error: 'please wait 5 min and try again',
			});

			try {
				const songCollectionRef = collection(db, 'song');
				await addDoc(songCollectionRef, {
					hash: tokenID,
					name: name,
					views: 0,
					likes: [],
				});
			} catch (err) {
				console.log(err);
			}

			setLoading('');

			navigate('/explore');
		} catch (error) {
			console.log('Error uploading file: ', error);
		}
	};
	return (
		<Box bgColor={'#241432'} style={mystyle} overflowY="hidden">
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
				ml={'300'}
				role={'group'}
				p={8}
				my={20}
				maxW={'900px'}
				w={'full'}
				bg={useColorModeValue('white', 'gray.800')}
				boxShadow={'2xl'}
				rounded={'lg'}
				zIndex={1}
			>
				<Heading mx="auto" mb={7}>
					Submit your form
				</Heading>
				<Box mr={10}>
					<FormControl mb={'7'}>
						<FormLabel htmlFor="name">Name</FormLabel>
						<Input
							w={'40%'}
							id="name"
							type="name"
							onChange={(event) => {
								setName(event.target.value);
							}}
							value={name}
						/>
					</FormControl>
					<FormControl mb={'7'}>
						<FormLabel htmlFor="audio">Audio</FormLabel>
						<Input
							w={'40%'}
							id="audio"
							type="file"
							accept="audio/mpeg3"
							onChange={handleMusic}
							disabled={loading}
						/>
					</FormControl>
					<FormControl mb={'7'}>
						<FormLabel htmlFor="audio">Image</FormLabel>
						<Input
							w={'40%'}
							id="audio"
							type="file"
							accept="image/*"
							onChange={handleImage}
							disabled={loading}
						/>
					</FormControl>
					<FormControl mb={'7'}>
						<FormLabel htmlFor="link">Number Of Copies</FormLabel>
						<input
							type="number"
							name="copies"
							id="link"
							onChange={(event) => {
								setCopies(event.target.value);
							}}
							onFocus={() => {
								if (!onFocus) {
									setCopies('');
									setOnFocus(true);
								}
							}}
							style={{
								width: '40%',
								height: '30px',
								border: '0.5px solid #D4DDE7',
								borderRadius: '5px',
							}}
							value={copies}
						/>
						{/* <FormHelperText w={"50%"}>
              OpenSea will include a link to this URL on this item's detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.
            </FormHelperText> */}
					</FormControl>
					<FormControl mb={'7'}>
						<FormLabel htmlFor="price">Price (in MATIC) for 1 copy</FormLabel>
						<input
							type="number"
							name="prices"
							id="price"
							onChange={(event) => {
								setPrice(event.target.value);
							}}
							onFocus={() => {
								if (!onFocus) {
									setCopies('');
									setOnFocus(true);
								}
							}}
							style={{
								width: '40%',
								height: '30px',
								border: '0.5px solid #D4DDE7',
								borderRadius: '5px',
							}}
							value={price}
						/>
						{/* <FormHelperText w={"50%"}>
              OpenSea will include a link to this URL on this item's detail
              page, so that users can click to learn more about it. You are
              welcome to link to your own webpage with more details.
            </FormHelperText> */}
					</FormControl>
					<FormControl mb={'7'}>
						<FormLabel htmlFor="lyrics">Lyrics</FormLabel>
						<Textarea
							w={'40%'}
							id="lyrics"
							type="textArea"
							onChange={(event) => {
								setLyrics(event.target.value);
							}}
							value={lyrics}
						/>
						<FormHelperText w={'50%'}>
							Provide the lyrics to your song
						</FormHelperText>
					</FormControl>
					<FormControl mb={'7'}>
						<FormLabel htmlFor="tags">Tags</FormLabel>
						<Input
							w={'40%'}
							id="tags"
							type="tags"
							onChange={(event) => {
								setTags(event.target.value);
							}}
							value={tags}
						/>
						<FormHelperText w={'50%'}>
							Add tags for your songs to allow users to easily search for your
							creation
						</FormHelperText>
					</FormControl>
					<Button
						type="submit"
						mt="2"
						size="lg"
						px="8"
						fontSize="2xl"
						colorScheme="brand"
						borderRadius="2xl"
						isLoading={loading}
						loadingText={loading}
						style={{
							boxShadow: '0px 4px 20px 8px gray.800',
							// border: '2px solid white',
						}}
						onClick={submitHandler}
					>
						Submit
					</Button>
					<Link to="/explore">
						<Button
							mt="2"
							ml="2"
							size="lg"
							px="8"
							fontSize="2xl"
							colorScheme="brand"
							borderRadius="2xl"
							style={{
								boxShadow: '0px 4px 20px 8px gray.800',
							}}
						>
							Back
						</Button>
					</Link>
				</Box>
			</Box>
		</Box>
	);
};

export default Form;

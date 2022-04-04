import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import { FaWallet } from 'react-icons/fa';
import { MdVerified } from 'react-icons/md';
import { Box, Button, Image } from '@chakra-ui/react';
import { AiFillEye } from 'react-icons/ai';
import classes from './Info1.module.css';
import { IoMdAdd, IoMdArrowBack } from 'react-icons/io';
import { RiSubtractLine } from 'react-icons/ri';
import { useColorModeValue } from '@chakra-ui/react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
	getMarketContractWrite,
	getNftContractRead,
	getNftContractWrite,
	truncateEthAddress,
} from '../../utils';
import { ethers } from 'ethers';
import contractAddress from '../../contracts/contract-address.json';
import toast from 'react-hot-toast';

function Info1() {
	const [albumName, setAlbumName] = useState('The Purpose Light');
	const [songName, setSongName] = useState('No Going back');
	const [ownerAddr, setOwnerAddr] = useState('0X128912');
	const [views, setViews] = useState(123);
	const [orderAmt, setOrderAmt] = useState(0);
	const [metaData, setMetaData] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	const getNftData = async () => {
		try {
			const nftContract = getNftContractRead();
			const tokenURI = await nftContract.tokenURIs(id);
			const meta = await axios.get(tokenURI);
			console.log('Meta data', meta.data);
			setMetaData(meta.data);
		} catch (e) {
			console.log(e.message);
		}
	};

	const { state } = useLocation();
	console.log('STate is ', state);
	const price = state?.price;

	const buyNFT = async () => {
		const marketContract = getMarketContractWrite();

		// const finalAmount = price * orderAmt;
		// console.log('fdsfasd', finalAmount);
		// const actualPrice = ethers.utils.parseUnits(
		// 	finalAmount.toString(),
		// 	'ether'
		// );

		const tx = await toast.promise(
			marketContract.createMarketSale(
				contractAddress.nftAddress,
				id,
				orderAmt,
				{ value: ethers.utils.parseUnits(price, 'ether') }
			),
			{
				loading: 'Confirm transaction',
				success: 'Transaction confirmed!',
				error: 'Transaction cancelled',
			}
		);

		await toast.promise(tx.wait(), {
			loading: 'Minning transaction, Hold tight!',
			success: 'Minned successfully !',
			error: 'please wait 5 min and try again',
		});

		navigate('/explore');
	};

	useEffect(() => {
		getNftData();
	}, []);

	return (
		<Box bgColor={'#241432'} overflowY={'hidden'} minH={'100vh'}>
			<Box
				role={'group'}
				p={6}
				maxW={'1000px'}
				w={'full'}
				bg={useColorModeValue('white', 'gray.800')}
				boxShadow={'2xl'}
				rounded={'lg'}
				pos={'relative'}
				mx={'auto'}
				mt={'70'}
				zIndex={1}
			>
				<div className={classes.mainContainer}>
					<div className={classes.imgData}>
						<img src={metaData.image} alt="" />
					</div>
					<div className={classes.nftData}>
						<div className={classes.songHeader}>
							<div className={classes.songName} style={{ fontWeight: '800' }}>
								<p>{metaData.name}</p>
							</div>
							<div className={classes.ownerDets}>
								<p
									className={classes.ownedBy}
									style={{
										color: '#7863AF',
										fontSize: '20px',
										fontWeight: '600',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									Owned By {truncateEthAddress(metaData.author)}
									<MdVerified
										style={{
											display: 'inline-block',
											fontSize: '20px',
											color: '#7863AF',
											marginLeft: '5px',
										}}
									/>
								</p>
								<p
									className={classes.likes}
									style={{
										color: '#7863AF',
										fontSize: '20px',
										fontWeight: '600',
										display: 'flex',
										alignItems: 'center',
									}}
								>
									<AiFillEye
										style={{
											fontSize: '15px',
											display: 'inline',
											color: '#7863AF',
											fontSize: '20px',
											fontWeight: '600',
											marginRight: '2px',
										}}
									/>{' '}
									{views} Views
								</p>
							</div>
						</div>
						<div className={classes.priceContainer}>
							<p style={{ color: '#707a83' }}>Current Price</p>
							<p>
								<span className={classes.price}>
									<i class="fab fa-ethereum"></i>{' '}
									<span
										style={{
											fontSize: '35px',
											fontWeight: '700',
											display: 'inline',
										}}
									>
										{' '}
										{/* <FaEthereum
											style={{ display: 'inline', fontSize: '26px' }}
										/> */}
										<Image
											src="../assets/matic-token.png"
											style={{ display: 'inline', marginRight: '4px' }}
											width="25px"
										/>
										{price}
									</span>{' '}
								</span>{' '}
								{/* <span className={classes.priceUsd}>(${usdPrice})</span> */}
							</p>
							<div className={classes.priceBtns}>
								<p style={{ color: '#707a83', marginTop: '15px' }}>
									Number of copies
								</p>
								<div
									className={classes.imgHeader}
									style={{
										marginTop: '10px',
										marginBottom: '20px',
										padding: '10px',
										justifyContent: 'space-evenly ',
									}}
								>
									{/* <FaEthereum style={{ display: "inline", fontSize: "17px" }} /> */}
									<IoMdAdd
										style={{
											display: 'inline',
											fontSize: '20px',
											marginRight: '5px',
											color: 'green',
										}}
										onClick={() => {
											setOrderAmt((prev) => {
												return prev + 1;
											});
										}}
									/>
									<RiSubtractLine
										style={{
											display: 'inline',
											fontSize: '20px',
											marginRight: '5px',
											color: 'red',
										}}
										onClick={() => {
											if (orderAmt > 0) {
												setOrderAmt((prev) => {
													return prev - 1;
												});
											}
										}}
									/>
									<p className={classes.likes}>{orderAmt}</p>
								</div>
								<Button
									className="myclass"
									leftIcon={<FaWallet />}
									bgColor="#D57FA7"
									color="white"
									variant="solid"
									width="190px"
									mt="15px"
									_hover={{
										color: 'white',
										backgroundColor: '#7863AF',
									}}
									onClick={buyNFT}
								>
									Buy Now
								</Button>
								<Link to="/explore">
									<Button
										className="myclass"
										leftIcon={<IoMdArrowBack />}
										bgColor="#D57FA7"
										color="white"
										variant="solid"
										ml="8px"
										mt="15px"
										_hover={{
											color: 'white',
											backgroundColor: '#7863AF',
										}}
									>
										Back
									</Button>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</Box>
		</Box>
	);
}

export default Info1;

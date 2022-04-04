import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';
import nftContractABI from '../contracts/NFT.json';
import marketContractABI from '../contracts/NftMarket.json';

export const getNftContractRead = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const nftContract = new ethers.Contract(
		contractAddress.nftAddress,
		nftContractABI.abi,
		signer
	);
	return nftContract;
};
export const getMarketContractRead = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const marketContract = new ethers.Contract(
		contractAddress.marketAddress,
		marketContractABI.abi,
		signer
	);
	return marketContract;
};

export const getNftContractWrite = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const nftContract = new ethers.Contract(
		contractAddress.nftAddress,
		nftContractABI.abi,
		signer
	);
	return nftContract;
};
export const getMarketContractWrite = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const nftContract = new ethers.Contract(
		contractAddress.marketAddress,
		marketContractABI.abi,
		signer
	);
	return nftContract;
};

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

export const truncateEthAddress = (address) => {
	const match = address?.match(truncateRegex);
	if (!match) return address;
	return `${match[1]}…${match[2]}`;
};

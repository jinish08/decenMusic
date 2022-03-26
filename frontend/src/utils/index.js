import { ethers } from 'ethers';
import contractAddress from '../contracts/contract-address.json';
import nftContractABI from '../contracts/NFT.json';
import marketContractABI from '../contracts/NftMarket.json';

export const getNftContractRead = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const nftContract = new ethers.Contract(
		contractAddress.nftAddress,
		nftContractABI.abi,
		provider
	);
	return nftContract;
};
export const getMarketContractRead = () => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const marketContract = new ethers.Contract(
		contractAddress.marketAddress,
		marketContractABI.abi,
		provider
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

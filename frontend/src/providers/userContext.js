import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { getMarketContractRead, getNftContractRead } from '../utils';

export const UserContext = React.createContext();

const { ethereum } = window;

export const UserProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState('');
	const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);
	const [loading, setLoading] = useState(false);
	const [allNFTs, setAllNFTs] = useState([]);

	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			// console.log(accounts);
			if (accounts.length > 0) {
				setCurrentAccount(accounts[0]);
			} else {
				console.log('NO accoutns found');
			}
			console.log(accounts);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const connectWallet = async () => {
		try {
			console.log('Connetct called ');
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log(accounts);
			setCurrentAccount(accounts[0]);
		} catch (error) {
			console.log(error);
			throw new Error(error.message);
		}
	};

	const getAllNFTs = async () => {
		const nftContract = getMarketContractRead();
		console.log(nftContract);
	};

	useEffect(() => {
		if (ethereum) {
			const getChain = async () => {
				const provider = new ethers.providers.Web3Provider(ethereum);
				const { chainId } = await provider.getNetwork(provider);
				console.log('CHAIN ID : ', chainId);
				setIsCorrectNetwork(chainId === 31337);
			};

			ethereum.on('accountsChanged', (accounts) => {
				setCurrentAccount(accounts[0]);
			});
			ethereum.on('networkChanged', function (networkId) {
				window.location.reload();
			});
			checkIfWalletIsConnected();
			getChain();
		}
	}, []);

	return (
		<UserContext.Provider
			value={{
				connectWallet,
				currentAccount,
				loading,
				isCorrectNetwork,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

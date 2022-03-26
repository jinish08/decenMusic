const hre = require('hardhat');

async function main() {
	const NFTMarket = await hre.ethers.getContractFactory('NFTMarket');
	const nftMarket = await NFTMarket.deploy();
	await nftMarket.deployed();
	console.log('Market address is : ', nftMarket.address);

	const NFT = await hre.ethers.getContractFactory('NFT');
	const nft = await NFT.deploy(nftMarket.address);
	await nft.deployed();
	console.log('NFT address is : ', nft.address);

	saveFrontendFiles(nftMarket.address, nft.address);
}

function saveFrontendFiles(marketAddress, nftAddress) {
	const fs = require('fs');

	const contractsDir = __dirname + '/../frontend/src/contracts';

	if (!fs.existsSync(contractsDir)) {
		fs.mkdirSync(contractsDir);
	}

	fs.writeFileSync(
		contractsDir + '/contract-address.json',
		JSON.stringify(
			{ marketAddress: marketAddress, nftAddress: nftAddress },
			undefined,
			2
		)
	);

	const NftMarket = artifacts.readArtifactSync('NFTMarket');
	const NFT = artifacts.readArtifactSync('NFT');

	fs.writeFileSync(
		contractsDir + '/NftMarket.json',
		JSON.stringify(NftMarket, null, 2)
	);
	fs.writeFileSync(contractsDir + '/NFT.json', JSON.stringify(NFT, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});

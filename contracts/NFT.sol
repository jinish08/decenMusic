// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

import "./ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC1155 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress;
    mapping(uint => string) public tokenURIs;
    event TokenCreated(uint tokenId);

    constructor(address markePlaceAddress){
        contractAddress = markePlaceAddress;
    }


     function setTokenURI(uint _id, string memory _uri) public {
        tokenURIs[_id] = _uri;
    }
   

    function createToken(uint amount,string memory tokenURI) public returns(uint) {
        _tokenIds.increment();
        uint tokenId = _tokenIds.current();

        _balances[tokenId][msg.sender] += amount;
        tokenURIs[tokenId] = tokenURI;
        setTokenURI(tokenId,tokenURI);
        setApprovalForAll(contractAddress, true);
        emit TokenCreated(tokenId);
        return tokenId;

    }

}
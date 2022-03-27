// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC1155.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract NFTMarket is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemSold;

    address payable owner;
    // uint listingPrice = 0.025 ether;

    constructor() {
        owner = payable(msg.sender);
    }

    struct MarketItem {
        uint itemId;
        address nftContract;
        uint tokenId;
        address payable seller;
        address payable owner;
        address thirdPerson;
        uint thridPersonAmount;
        uint price;
        uint amount;
        bool sold;
    }

    mapping(uint => MarketItem) private idToMarketItem;

    event MarketItemCreated (
        uint indexed itemId,
        address indexed nftContract,
        uint indexed tokenId,
        address payable seller,
        address payable owner,
        address thirdPerson,
        uint thridPersonAmount,
        uint price,
        uint amount,
        bool sold
    );

    // function getListingPrice() view public returns(uint) { 
    //     return listingPrice;
    // }

    function createMarketItem(address nftContract, uint tokenId, uint amount,uint price ) public payable nonReentrant {
        require(price > 0, "Price must be atleast 1 wei");
        // require(msg.value == listingPrice, "Price must be equal to listing price");

        _itemIds.increment();
        uint itemId = _itemIds.current();
        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            address(0),
            0,
            price,
            amount,
            false
        );

        ERC1155(nftContract)._transfer(msg.sender, address(this), tokenId, amount);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            address(0),
            0,
            price,
            amount,
            false
        );

    }

    function createMarketSale(address nftContract, uint itemId, uint amount) public payable nonReentrant {
        uint price = idToMarketItem[itemId].price;
        uint tokenId = idToMarketItem[itemId].tokenId;
        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToMarketItem[itemId].seller.transfer(msg.value);
        ERC1155(nftContract)._transfer(address(this), msg.sender, tokenId, amount);
        idToMarketItem[itemId].thirdPerson = msg.sender;
        idToMarketItem[itemId].thridPersonAmount += amount;
        idToMarketItem[itemId].amount -= amount;
        // owner.transfer(listingPrice);
    }  

    function fetchMarketItems() public view returns(MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint currIndex = 0;

        MarketItem[] memory items= new MarketItem[](totalItemCount);

        for (uint256 i = 0; i < totalItemCount; i++) {
                if(idToMarketItem[i+1].owner == address(0)){
                    uint currentId = idToMarketItem[i+1].itemId;
                    MarketItem storage currentItem = idToMarketItem[currentId];
                    items[currIndex] = currentItem;
                    currIndex++;
                }
        }

        return items;

    }

    function fetchMyNFTs() public view returns(MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint currentIndex = 0;
        uint itemCount = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender || idToMarketItem[i+1].thirdPerson == msg.sender) {
                itemCount++;
            }
        }

        MarketItem[] memory items= new MarketItem[](itemCount); 

        for (uint256 i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender || idToMarketItem[i+1].thirdPerson == msg.sender) {
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            } 
        }

        return items;

    }

    function fetchItemsCreated() public view returns(MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint itemsCreatedCount = 0;
        uint currentIndex = 0;

        for(uint256 i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender) {
                itemsCreatedCount++;
            }
        }

        MarketItem[] memory items= new MarketItem[](itemsCreatedCount);

        for(uint256 i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender){
                uint currentId = idToMarketItem[i+1].itemId;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;

    }

}
    
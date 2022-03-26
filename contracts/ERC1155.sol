// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract ERC1155 {

    mapping(uint => mapping(address => uint)) internal _balances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;

    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    event TransferSingle(address indexed operator, address indexed  from , address indexed to, uint tokenId, uint amount);
    event TranferBatch(address indexed operator, address indexed  from , address indexed to, uint[] tokenIds, uint[] amounts);

    // Returns the balance of an accounts tokens
    function balanceOf(address _account, uint _tokenId)public view returns(uint){ 
        require(_account != address(0), "Address is zero");
        return _balances[_tokenId][_account];
    }

    // Returns the balance of mulitple accounts tokens
    function balanceOfBatch(address[] memory _accounts, uint[] memory _tokenIds) public view  returns(uint[] memory) {
        require(_accounts.length == _tokenIds.length, "Accounts and Ids are not of same length");

        uint[] memory batchBalances = new uint[](_accounts.length);

        for(uint i = 0; i < _accounts.length; i++){
             batchBalances[i] = balanceOf(_accounts[i], _tokenIds[i]);
        }

        return batchBalances;

    }

    // Checks if an address is an operatory for an another address
    function isApprovedForAll(address _owner, address _operator) public view returns(bool) {

         return _operatorApprovals[_owner][_operator];
    }

    // Enables or disables an operator to manage all of senders assets
    function setApprovalForAll(address _operator, bool _approved) public {
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function _transfer(address _from , address _to , uint _tokenId, uint amount) public {
        uint fromBalance = _balances[_tokenId][_from];
        require(fromBalance >= amount, "Insufficient Balanace");
        _balances[_tokenId][_from] = fromBalance - amount;
        _balances[_tokenId][_to] += amount;
    }

    function safeTransferFrom(address _from , address _to , uint _tokenId, uint amount) public virtual {
        require(_from == msg.sender || isApprovedForAll(_from,msg.sender), "Msg.sender is not the owner or approved to transfer");
        require(_to == address(0) , "Address is 0");
        _transfer(_from, _to, _tokenId, amount);
        emit TransferSingle(msg.sender, _from, _to, _tokenId, amount);
        require(_checkOnERC1155Received(), "Receiver is not implemented");
    }

    function _checkOnERC1155Received() private pure  returns(bool) {
        return true;
    }

    function safeBatchTransferFrom(address _from , address _to , uint[] memory _tokenIds, uint[] memory amounts)public {
        require(_from == msg.sender || isApprovedForAll(_from,msg.sender), "Msg.sender is not the owner or approved to transfer");
        require(_to == address(0) , "Address is 0");
        require(_tokenIds.length == amounts.length, "Ids and amount are not the same length");
        for(uint i = 0; i < _tokenIds.length ; i++){
            uint id = _tokenIds[i];
            uint amount = amounts[i];

            _transfer(_from, _to, id, amount);
            require(_checkOnBatchERC1155Received(), "Receiver is not implemented");
        }

        emit TranferBatch(msg.sender, _from, _to, _tokenIds, amounts);
    }

    function _checkOnBatchERC1155Received() private pure  returns(bool) {
        return true;
    }

    // ERC165-Compliant
    // Tell everyone that we supports ERC1155 functions
    // InterfaceId  == 0xd9b67a26

    function supportsInterface(bytes4 interfaceId)public pure virtual returns (bool){
        return interfaceId == 0xd9b67a26;
    }       

}
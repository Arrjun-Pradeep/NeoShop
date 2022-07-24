// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./accessControl.sol";

contract Payment is AccessControl{

    struct buyer {
        string name;
        address addr;
    }

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    struct seller {
        string name;
        address addr;
    }

    mapping(address => buyer) public buyers;
    mapping(address => seller) public sellers;
    mapping(uint256 => uint256) private amount;
    mapping(uint256 => string) private uri;

    event buyLog(address indexed _buyer, uint256 price, uint256 productId);
    event payToSellerLog(
        address indexed _seller,
        uint256 _amount,
        uint256 _productId
    );
    event refundLog(address indexed buyer, uint256 _amount, uint256 _productId);

    receive() external payable {}

    function sellerSignUp(string memory _name) public onlyRole(SELLER) {
        sellers[msg.sender].name = _name;
        sellers[msg.sender].addr = msg.sender;
    }

    function buyerSignIn(string memory _name) public onlyRole(BUYER) {
        buyers[msg.sender].name = _name;
        buyers[msg.sender].addr = msg.sender;
    }

    function buy(uint256 _amount, uint256 _id) public payable onlyRole(BUYER) {
        require(msg.value > 0, "Minimum value should not be zero");
        require(msg.value >= _amount, "Less amount");
        (bool sent, ) = payable(owner).call{value: msg.value}("");
        require(sent, "Failed to send matic");
        amount[_id] = _amount;
        emit buyLog(msg.sender, _amount, _id);
    }

    function payToSeller(
        address payable _seller,
        uint256 _amount,
        uint256 _id
    ) public payable onlyRole(ADMIN) {
        require(amount[_id] == _amount, "Invalid Amount");
        require(sellers[_seller].addr == _seller, "Incorrect seller");
        (bool sent, ) = payable(_seller).call{value: msg.value}("");
        require(sent, "Failed to send matic");
        emit payToSellerLog(_seller, _amount, _id);
    }

    /* 
       We can use this feature, if there is delivery ecosystem. 
       Any user will claim for refund if order is canceled order before delivery 
    */

    function refund(
        address _buyer,
        uint256 _amount,
        uint256 _id
    ) public payable onlyRole(ADMIN) {
        require(amount[_id] == _amount, "Invalid amount");
        require(buyers[_buyer].addr == _buyer, "Incorrect buyer");
        (bool sent, ) = payable(_buyer).call{value: _amount}("");
        require(sent, "Failed to send matic");
        emit refundLog(_buyer, _amount, _id);
    }

    function productURI(string memory _uri, uint256 _productId)
        public
        returns (bool)
    {
        uri[_productId] = _uri;
        return true;
    }

    function getProductURI(uint256 _id) public view returns (string memory) {
        return uri[_id];
    }
}
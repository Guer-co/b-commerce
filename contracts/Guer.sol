// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;
import './Nft.sol';

contract Guer {

    address docId;
    mapping(address => address[]) NftsByUser;
    address payable ourWallet;
    constructor() payable {
        ourWallet = payable(msg.sender);
    }

    function getGuerOwnerAddress() public view returns(address){
        return ourWallet;
    }

    function doPayRoyalty() public payable returns(bool){
        //if (msg.value >= .001 ether)
        //{
        //    ourWallet.transfer(msg.value);
        //    return true;
        //}
        //else {
        //    return false;
        //}
    }

    function updateUserProfile(address payable docAddress, bytes32 _name, bytes32 _email, bytes32 _mobile, bytes memory _image) public payable {
        Nft(docAddress).updateUserProfile(_name,_email, _mobile, _image);
    }

    function createNFT(bytes32 _name, bytes32 _email, bytes32 _mobile, bytes memory _image) public payable {
        Nft a = new Nft(_name, _email, _mobile, _image);
        NftsByUser[msg.sender].push(address(a));
    }

    function getUserNFTs() public view returns (address[] memory){
        return NftsByUser[msg.sender];
    }

    function getaNFTInfo(address payable docAddress) public view returns (address, bytes32, bytes32, bytes32, bytes memory, uint, address[] memory, address[] memory, uint){
        return Nft(docAddress).getNft();
    }

    function doGetPhotoCount(address payable docAddress) public view returns (uint) {
        return Nft(docAddress).getPhotoCount();
    }

    function doGetPhoto(address payable docAddress, uint _id) public view returns (string memory, string memory, uint, string memory) {
        return Nft(docAddress).getPhotoDetails(_id);
    }

    function doAddPhoto(address payable docAddress, string memory _location, string memory _name, string memory _filetype) public {
        Nft(docAddress).addPhoto(_location, _name, _filetype);
    }

    function doRemovePhoto(address payable docAddress, uint _id) public {
        Nft(docAddress).removePhoto(_id);
    }

    function doAddMessage(address payable docAddress, address _partner, string memory _location, string memory _key) public {
        return Nft(docAddress).addMessage(_partner,_location,_key);
    }

    function doGetMessages(address payable docAddress, address _partner) public view returns (string memory, string memory) {
        return Nft(docAddress).getMessages(_partner);
    }

    function doRemoveUserFromAddressBook(address payable docAddress, address _userAddress) public {
        Nft(docAddress).removeAddressFromBook(_userAddress);
    }

    function doAddUserToAddressBook(address payable docAddress, address _otherAccount, bytes32 _name, bool _coowner) public {
        Nft(docAddress).addAddressToBook(_otherAccount, _name, _coowner);
    }

    function doTransferFunds(address payable docAddress, address payable _receiver, uint256 _amount) public payable {
        Nft(docAddress).transferFunds(_receiver, _amount);
    }

    function doGetContactInfo(address payable docAddress, address _otherAccount) public view returns (address,bytes32,bool) {
        return Nft(docAddress).getContactInfo(_otherAccount);
    }

    function doGetMarketplaceJson(address payable docAddress) public view returns (string memory) {
        return Nft(docAddress).getMarketplaceJson();
    }

    function doUpdateMarketplaceJson(address payable docAddress, string memory _json) public {
        Nft(docAddress).updateMarketplaceJson(_json);
    }
}

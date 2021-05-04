// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma experimental ABIEncoderV2;

contract Nft {

    fallback() external payable {}
    receive() external payable {}

    address id;
    uint creationDate;
    address[] myAddresses;
    address[] otherAddresses;
    string marketplaceJSON;

    struct userProfile{
        address creator;
        bytes32 name;
        bytes32 email;
        bytes32 mobile;
        bytes image;
    }

    mapping(address => userProfile) public userInfo;
    mapping(address => contactProfile) public contactInfo;

    struct contactProfile{
        bytes32 name;
        bool coowner;
    }

    struct Photo {
        string location;
        string name;
        uint date;
        string filetype;
    }

    struct General {
        string location;
        string name;
        uint date;
        string filetype;
    }

    struct Personal {
        string location;
        string name;
        uint date;
        string filetype;
    }

    mapping(uint => Photo) public photos;
    uint public photoCount;

    mapping(uint => General) public general;
    uint public generalCount;

    mapping(uint => Personal) public personal;
    uint public personalCount;

    struct Message {
        string location;
        string key;
    }

    mapping(address => Message) public messages;

    address[] photoAccess;
    address[] generalAccess;
    address[] personalAccess;

    constructor(bytes32 _name, bytes32 _email, bytes32 _mobile, bytes memory _image) payable {
        userInfo[msg.sender] = userProfile(msg.sender, _name, _email, _mobile, _image);
        id = address(this);
        creationDate = block.timestamp;
    }

    function addMessage(address _partner, string memory _location, string memory _key) public {
        messages[_partner].location = _location;
        messages[_partner].key = _key;
    }

    function getMessages(address _partner) public view returns (string memory, string memory) {
        return (messages[_partner].location, messages[_partner].key);
    }

    function addPhoto(string memory _location, string memory _name, string memory _filetype) public {
        photoCount = photoCount + 1;
        photos[photoCount].location = _location;
        photos[photoCount].name = _name;
        photos[photoCount].date = block.timestamp;
        photos[photoCount].filetype = _filetype;
    }

    function getPhotoCount() public view returns (uint) {
        return photoCount;
    }

    function getPhotoDetails(uint _id) public view returns (string memory, string memory, uint, string memory) {
        return (photos[_id].location, photos[_id].name, photos[_id].date, photos[_id].filetype);
    }

    function removePhoto(uint _id) public payable{
        photoCount = photoCount - 1;
        photos[_id].location = '';
        photos[_id].name = '';
        photos[_id].date = 0;
        photos[_id].filetype = '';
    }

    function getNft() public view returns (address, bytes32, bytes32, bytes32, bytes memory, uint, address[] memory, address[] memory, uint) {
        return (id, userInfo[msg.sender].name, userInfo[msg.sender].email, userInfo[msg.sender].mobile, userInfo[msg.sender].image, creationDate, myAddresses, otherAddresses, photoCount);
    }

    function getMarketplaceJson() public view returns (string memory) {
        return (marketplaceJSON);
    }

    function updateMarketplaceJson(string memory _json) public {
        marketplaceJSON = _json;
    }

    //function getOtherAddressesArray() public view returns (address[] memory) {
    //    return (otherAddresses);
    //}

    function getContactInfo(address _otherAccount) public view returns (address, bytes32,bool) {
        return (_otherAccount,contactInfo[_otherAccount].name, contactInfo[_otherAccount].coowner);
    }

    function updateUserProfile(bytes32 _name, bytes32 _email, bytes32 _mobile, bytes memory _image) public payable {
        userInfo[msg.sender] = userProfile(msg.sender, _name, _email, _mobile, _image);
    }

    function addAddressToBook (address _otherAccount, bytes32 _name, bool _coowner) public payable {
        //for (uint i=0; i<myAddresses.length; i++) {
        //    if ([msg.sender][i] != _otherAccount) {
                contactInfo[_otherAccount] = contactProfile(_name, _coowner);
                myAddresses.push(address(_otherAccount));
        //    }
        //}
    }

    function removeAddressFromBook(address _otherAccount) public payable returns(bool){
        uint indexToBeDeleted;
        for (uint i=0; i < myAddresses.length; i++) {
            if (myAddresses[i] == _otherAccount) {
                indexToBeDeleted = i;
                break;
            }
        }
        delete myAddresses[indexToBeDeleted];
        return true;
    }

    function getUserAddresses() public view returns (address[] memory){
        //if (msg.sender == userInfo[_user].creator) {
            return (myAddresses);
        //}
    }

    function transferFunds(address payable _receiver, uint256 _amount) pure external {
        payable(_receiver).call{value:_amount};
    }

}
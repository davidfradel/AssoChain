// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract UserManagement is Ownable {
    struct User {
        address userAddress;
        bool isRegistered;
        uint256 membershipExpiry;
    }

    mapping(address => User) private users;
    address[] private userAddresses;

    uint256 public registrationFee = 0.001 ether;
    uint256 public membershipDuration = 365 days;

    constructor() Ownable(msg.sender) {}

    event UserRegistered(address indexed userAddress);
    event UserRemoved(address indexed userAddress);
    event MembershipUpdated(address indexed userAddress, uint256 newExpiry);
    event FeeUpdated(uint256 newFee);

    function registerUser() public payable {
        require(!users[msg.sender].isRegistered, "User already registered");
        require(msg.value >= registrationFee, "Insufficient registration fee");

        users[msg.sender] = User(
            msg.sender,
            true,
            block.timestamp + membershipDuration
        );
        userAddresses.push(msg.sender);

        emit UserRegistered(msg.sender);
    }

    function removeUser(address _userAddress) public onlyOwner {
        require(users[_userAddress].isRegistered, "User not registered");

        users[_userAddress].isRegistered = false;

        for (uint256 i = 0; i < userAddresses.length; i++) {
            if (userAddresses[i] == _userAddress) {
                userAddresses[i] = userAddresses[userAddresses.length - 1];
                userAddresses.pop();
                break;
            }
        }

        emit UserRemoved(_userAddress);
    }

    function updateMembership(address _userAddress) public onlyOwner {
        require(users[_userAddress].isRegistered, "User not registered");
        users[_userAddress].membershipExpiry =
            block.timestamp +
            membershipDuration;

        emit MembershipUpdated(
            _userAddress,
            users[_userAddress].membershipExpiry
        );
    }

    function getUser(address _userAddress) public view returns (User memory) {
        require(users[_userAddress].isRegistered, "User not registered");
        return users[_userAddress];
    }

    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]];
        }
        return allUsers;
    }

    function getAllUserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    function updateRegistrationFee(uint256 _newFee) public onlyOwner {
        registrationFee = _newFee;
        emit FeeUpdated(_newFee);
    }
}

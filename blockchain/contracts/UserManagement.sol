// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./SoulBoundToken.sol";
import "./FFBCommunityToken.sol";

/**
 * @title UserManagement
 * @dev Manages user registrations, activations, and memberships using SoulBoundTokens and CommunityTokens.
 */
contract UserManagement is Ownable {
    struct User {
        address userAddress;
        bool isRegistered;
        bool isActive;
        uint256 membershipExpiry;
    }

    mapping(address => User) private users;
    address[] private userAddresses;

    uint256 public registrationFee = 0.001 ether;
    uint256 public membershipDuration = 365 days;
    SoulBoundToken public sbt;
    CommunityToken public ctk;

    event UserRegistered(address indexed userAddress);
    event UserRemoved(address indexed userAddress);
    event MembershipUpdated(address indexed userAddress, uint256 newExpiry);
    event UserActivated(address indexed userAddress);
    event FeeUpdated(uint256 newFee);

    /**
     * @dev Constructor that sets the addresses of the SoulBoundToken and CommunityToken contracts.
     * @param _sbt The address of the SoulBoundToken contract.
     * @param _ctk The address of the CommunityToken contract.
     */
    constructor(SoulBoundToken _sbt, CommunityToken _ctk) Ownable(msg.sender) {
        sbt = _sbt;
        ctk = _ctk;
    }

    /**
     * @dev Registers a new user by minting a SoulBoundToken and storing the user's information.
     * @param name The name of the user.
     * @param description The description of the user.
     * @param image The image URI of the user.
     */
    function registerUser(
        string memory name,
        string memory description,
        string memory image
    ) public payable {
        require(msg.sender != address(0), "Invalid address");
        require(!users[msg.sender].isRegistered, "User already registered");
        require(msg.value >= registrationFee, "Insufficient registration fee");

        users[msg.sender] = User(msg.sender, true, false, 0);
        userAddresses.push(msg.sender);

        sbt.mint(msg.sender, name, description, image);

        emit UserRegistered(msg.sender);
    }

    /**
     * @dev Activates a registered user and mints CommunityTokens to the user.
     * @param userAddress The address of the user to activate.
     */
    function activateUser(address userAddress) public onlyOwner {
        require(userAddress != address(0), "Invalid address");
        require(users[userAddress].isRegistered, "User not registered");
        require(!users[userAddress].isActive, "User already active");

        uint256 tokenId = uint256(uint160(userAddress));
        users[userAddress].isActive = true;
        users[userAddress].membershipExpiry =
            block.timestamp +
            membershipDuration;

        // Activate the SBT token
        sbt.activateToken(tokenId);
        // Mint Community Tokens to the user
        ctk.mint(userAddress, 20 * 10 ** 18);

        emit UserActivated(userAddress);
    }

    /**
     * @dev Disables a user by removing them from the list of active users.
     * @param _userAddress The address of the user to disable.
     */
    function disableUser(address _userAddress) public onlyOwner {
        require(users[_userAddress].isRegistered, "User not registered");

        users[_userAddress].isActive = false;

        for (uint256 i = 0; i < userAddresses.length; i++) {
            if (userAddresses[i] == _userAddress) {
                userAddresses[i] = userAddresses[userAddresses.length - 1];
                userAddresses.pop();
                break;
            }
        }

        emit UserRemoved(_userAddress);
    }

    /**
     * @dev Updates the membership expiry of a user and mints additional CommunityTokens.
     * @param _userAddress The address of the user to update.
     */
    function updateMembership(address _userAddress) public onlyOwner {
        require(users[_userAddress].isRegistered, "User not registered");
        users[_userAddress].membershipExpiry =
            block.timestamp +
            membershipDuration;

        ctk.mint(_userAddress, 20 * 10 ** 18);

        emit MembershipUpdated(
            _userAddress,
            users[_userAddress].membershipExpiry
        );
    }

    /**
     * @dev Retrieves the information of a registered user.
     * @param _userAddress The address of the user to retrieve.
     * @return User The information of the user.
     */
    function getUser(address _userAddress) public view returns (User memory) {
        require(users[_userAddress].isRegistered, "User not registered");
        return users[_userAddress];
    }

    /**
     * @dev Retrieves all registered users.
     * @return User[] The list of all registered users.
     */
    function getAllUsers() public view returns (User[] memory) {
        User[] memory allUsers = new User[](userAddresses.length);
        for (uint256 i = 0; i < userAddresses.length; i++) {
            allUsers[i] = users[userAddresses[i]];
        }
        return allUsers;
    }

    /**
     * @dev Retrieves all registered user addresses.
     * @return address[] The list of all registered user addresses.
     */
    function getAllUserAddresses() public view returns (address[] memory) {
        return userAddresses;
    }

    /**
     * @dev Updates the registration fee.
     * @param _newFee The new registration fee.
     */
    function updateRegistrationFee(uint256 _newFee) public onlyOwner {
        registrationFee = _newFee;
        emit FeeUpdated(_newFee);
    }
}

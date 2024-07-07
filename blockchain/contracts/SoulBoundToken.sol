// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@quant-finance/solidity-datetime/contracts/DateTime.sol";

/**
 * @title SoulBoundToken
 * @dev ERC721 Token representing a Soul Bound Token with metadata and subscription periods.
 * Only the owner can mint and manage tokens.
 */
contract SoulBoundToken is ERC721, Ownable {
    using DateTime for uint256;

    struct SubscriptionPeriod {
        uint256 startTime;
        uint256 endTime;
    }

    struct Metadata {
        string name;
        string description;
        string image;
        bool tokenActivated;
        SubscriptionPeriod[] subscriptionPeriods;
    }

    mapping(uint256 => Metadata) private _tokenMetadata;
    mapping(uint256 => address) private _tokenOwners;

    /**
     * @dev Constructor that sets the token name and symbol.
     */
    constructor() ERC721("FFB-Member", "ACB") Ownable(msg.sender) {}

    /**
     * @dev Mints a new token.
     * @param to The address that will own the minted token.
     * @param name The name of the token.
     * @param description The description of the token.
     * @param image The image URI of the token.
     */
    function mint(
        address to,
        string memory name,
        string memory description,
        string memory image
    ) external onlyOwner {
        require(to != address(0), "Invalid address");
        uint256 tokenId = uint256(uint160(to));
        if (_tokenOwners[tokenId] == address(0)) {
            _mint(to, tokenId);
            _tokenOwners[tokenId] = to;
        }
        Metadata storage metadata = _tokenMetadata[tokenId];
        metadata.name = name;
        metadata.description = description;
        metadata.image = image;
        metadata.tokenActivated = false;
        // Initialize subscription periods as an empty array
    }

    /**
     * @dev Activates a token.
     * @param tokenId The ID of the token to activate.
     */
    function activateToken(uint256 tokenId) external onlyOwner {
        require(tokenExists(tokenId), "Token does not exist");

        _tokenMetadata[tokenId].tokenActivated = true;
        addSubscriptionPeriod(tokenId, block.timestamp);
    }

    /**
     * @dev Adds a subscription period to a token.
     * @param tokenId The ID of the token to add the subscription period to.
     * @param startTime The start time of the subscription period.
     */
    function addSubscriptionPeriod(
        uint256 tokenId,
        uint256 startTime
    ) internal {
        require(tokenExists(tokenId), "Token does not exist");
        uint256 endTime = startTime.addYears(1);
        _tokenMetadata[tokenId].subscriptionPeriods.push(
            SubscriptionPeriod(startTime, endTime)
        );
    }

    /**
     * @dev Renews the subscription of a token.
     * @param tokenId The ID of the token to renew the subscription for.
     */
    function renewSubscription(uint256 tokenId) external onlyOwner {
        require(tokenExists(tokenId), "Token does not exist");
        uint256 currentTime = block.timestamp;
        uint256 endTime = _tokenMetadata[tokenId]
            .subscriptionPeriods[
                _tokenMetadata[tokenId].subscriptionPeriods.length - 1
            ]
            .endTime;
        require(
            currentTime >= endTime - 30 days,
            "Renewal only allowed in the last month of subscription"
        );
        if (isSubscribed(tokenId)) {
            endTime = endTime.addYears(1);
            _tokenMetadata[tokenId]
                .subscriptionPeriods[
                    _tokenMetadata[tokenId].subscriptionPeriods.length - 1
                ]
                .endTime = endTime;
        } else {
            addSubscriptionPeriod(tokenId, currentTime);
        }
    }

    /**
     * @dev Checks if a token is subscribed.
     * @param tokenId The ID of the token to check the subscription for.
     * @return bool True if the token is subscribed, false otherwise.
     */
    function isSubscribed(uint256 tokenId) public view returns (bool) {
        require(tokenExists(tokenId), "Token does not exist");
        if (_tokenMetadata[tokenId].subscriptionPeriods.length == 0) {
            return false;
        }
        uint256 currentTime = block.timestamp;
        uint256 endTime = _tokenMetadata[tokenId]
            .subscriptionPeriods[
                _tokenMetadata[tokenId].subscriptionPeriods.length - 1
            ]
            .endTime;
        return currentTime <= endTime;
    }

    /**
     * @dev Gets the subscription end time of a token.
     * @param tokenId The ID of the token to get the subscription end time for.
     * @return uint256 The subscription end time.
     */
    function getSubscriptionEndTime(
        uint256 tokenId
    ) public view returns (uint256) {
        require(tokenExists(tokenId), "Token does not exist");
        if (_tokenMetadata[tokenId].subscriptionPeriods.length == 0) {
            return 0;
        }
        return
            _tokenMetadata[tokenId]
                .subscriptionPeriods[
                    _tokenMetadata[tokenId].subscriptionPeriods.length - 1
                ]
                .endTime;
    }

    /**
     * @dev Gets the metadata of a token.
     * @param tokenId The ID of the token to get the metadata for.
     * @return Metadata The metadata of the token.
     */
    function getMetadata(
        uint256 tokenId
    ) public view returns (Metadata memory) {
        require(tokenExists(tokenId), "Token does not exist");
        return _tokenMetadata[tokenId];
    }

    /**
     * @dev Checks if the contract supports a given interface.
     * @param interfaceId The interface ID to check.
     * @return bool True if the interface is supported, false otherwise.
     */
    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /**
     * @dev Checks if a token exists.
     * @param tokenId The ID of the token to check.
     * @return bool True if the token exists, false otherwise.
     */
    function tokenExists(uint256 tokenId) internal view returns (bool) {
        return _tokenOwners[tokenId] != address(0);
    }

    /**
     * @dev Gets the owner of a token.
     * @param tokenId The ID of the token to get the owner for.
     * @return address The owner of the token.
     */
    function ownerOf(uint256 tokenId) public view override returns (address) {
        if (!tokenExists(tokenId)) {
            return address(0);
        }
        return _tokenOwners[tokenId];
    }

    /**
     * @dev Prevents the transfer of tokens.
     */
    function transferFrom(
        address,
        address,
        uint256
    ) public pure override(ERC721) {
        revert("Soul Bound Token cannot be transferred");
    }

    /**
     * @dev Prevents the safe transfer of tokens.
     */
    function safeTransferFrom(
        address,
        address,
        uint256,
        bytes memory
    ) public pure override {
        revert("Soul Bound Token cannot be transferred");
    }
}

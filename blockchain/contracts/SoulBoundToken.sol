// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@quant-finance/solidity-datetime/contracts/DateTime.sol";
import "hardhat/console.sol";

/**
 * @title SoulBoundToken
 * @dev ERC721 Token representing a Soul Bound Token with metadata and subscription periods.
 * Only the owner can mint and manage tokens.
 */
contract SoulBoundToken is IERC721, ERC721URIStorage, Ownable {
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
    uint256[] private _allTokenIds;
    uint256 private _currentTokenId;
    string private _baseTokenURI;

    event TokenMinted(address indexed to, uint256 indexed tokenId);
    event TokenActivated(uint256 indexed tokenId);
    event SubscriptionRenewed(uint256 indexed tokenId, uint256 newEndTime);

    /**
     * @dev Constructor that sets the token name and symbol.
     */
    constructor() ERC721("FFB-Member", "ACB") Ownable(msg.sender) {
        _baseTokenURI = "ipfs://QmPuJwk1k94rV2p7P1P2ZzY5ZUfpu588RCQ1Z7akMrAC4g";
        _currentTokenId = 1;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev Mints a new token.
     * @param to The address that will own the minted token.
     */
    function mint(address to) external onlyOwner returns (uint256) {
        require(to != address(0), "Invalid address");

        uint256 tokenId = _currentTokenId;
        _currentTokenId += 1;

        _mint(to, tokenId);

        Metadata storage metadata = _tokenMetadata[tokenId];
        metadata.name = "FFB-Member";
        metadata
            .image = "ipfs://QmZDnxHF578BY3Rc5PnsyUGXgxurAJFMVPQ6unDjnLvznP";
        metadata.description = "Unique NFT by member";
        metadata.tokenActivated = false;

        _allTokenIds.push(tokenId); // Add token to list of all token IDs

        emit TokenMinted(to, tokenId);
        return tokenId;
    }

    /**
     * @dev Activates a token.
     * @param tokenId The ID of the token to activate.
     */
    function activateToken(uint256 tokenId) external onlyOwner {
        require(tokenExists(tokenId), "Token does not exist");

        _tokenMetadata[tokenId].tokenActivated = true;
        addSubscriptionPeriod(tokenId, block.timestamp);
        emit TokenActivated(tokenId);
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
     * @dev Checks if a token exists.
     * @param tokenId The ID of the token to check.
     * @return bool True if the token exists, false otherwise.
     */
    function tokenExists(uint256 tokenId) internal view returns (bool) {
        for (uint256 i = 0; i < _allTokenIds.length; i++) {
            if (_allTokenIds[i] == tokenId) {
                return true;
            }
        }
        return false;
    }

    /**
     * @dev Prevents the transfer of tokens.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) public pure override(ERC721, IERC721) {
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
    ) public pure override(ERC721, IERC721) {
        revert("Soul Bound Token cannot be transferred");
    }

    /**
     * @dev Returns the metadata URI for a given token ID.
     * @param tokenId The ID of the token to get the metadata URI for.
     * @return string The metadata URI.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(tokenExists(tokenId), "Token does not exist");
        return string.concat(_baseTokenURI, Strings.toString(tokenId));
    }
}

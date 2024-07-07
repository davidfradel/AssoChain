// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@quant-finance/solidity-datetime/contracts/DateTime.sol";

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

    constructor() ERC721("SoulBoundToken", "SBT") Ownable(msg.sender) {}

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

    function activateToken(uint256 tokenId) external onlyOwner {
        require(tokenExists(tokenId), "Token does not exist");

        _tokenMetadata[tokenId].tokenActivated = true;
        addSubscriptionPeriod(tokenId, block.timestamp);
    }

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

    function getMetadata(
        uint256 tokenId
    ) public view returns (Metadata memory) {
        require(tokenExists(tokenId), "Token does not exist");
        return _tokenMetadata[tokenId];
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenExists(uint256 tokenId) internal view returns (bool) {
        return _tokenOwners[tokenId] != address(0);
    }

    function ownerOf(uint256 tokenId) public view override returns (address) {
        if (!tokenExists(tokenId)) {
            return address(0);
        }
        return _tokenOwners[tokenId];
    }

    function transferFrom(
        address,
        address,
        uint256
    ) public pure override(ERC721) {
        revert("Soul Bound Token cannot be transferred");
    }

    function safeTransferFrom(
        address,
        address,
        uint256,
        bytes memory
    ) public pure override {
        revert("Soul Bound Token cannot be transferred");
    }
}

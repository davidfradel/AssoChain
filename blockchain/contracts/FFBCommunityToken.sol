// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CommunityToken
 * @dev ERC20 Token representing community token with an initial supply.
 * Only the owner can mint new tokens.
 */
contract CommunityToken is ERC20, Ownable {
    /**
     * @dev Constructor that gives msg.sender all of the existing tokens.
     * @param initialSupply The initial supply of tokens.
     */
    constructor(
        uint256 initialSupply
    ) ERC20("FFB-Community-Token", "FFB") Ownable(msg.sender) {
        _mint(msg.sender, initialSupply);
    }

    /**
     * @dev Function to mint tokens
     * @param to The address that will receive the minted tokens.
     * @param amount The amount of tokens to mint.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}

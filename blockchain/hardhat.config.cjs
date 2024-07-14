require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-ignition-ethers");
require("@nomicfoundation/hardhat-ignition");
require("@nomicfoundation/hardhat-ethers");
require("@nomicfoundation/hardhat-verify");
require("@typechain/hardhat");
require("solidity-coverage");

require('dotenv').config({path: '../.env'});

if(!process.env.INFURA_PROJECT_ID) {
  throw new Error("Please set your INFURA_PROJECT_ID in a .env file");
} 

if(!process.env.PRIVATE_KEY_ADMIN) {
  throw new Error("Please set your PRIVATE_KEY_ADMIN in a .env file");
}

const config = {
  solidity: "0.8.24",
    networks: {
      hardhat: {},
      localhost: {
        url: "http://127.0.0.1:8545",
      },
      sepolia: {
        url: `https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: [process.env.PRIVATE_KEY_ADMIN],
      },
      arbitrumSepolia: {
        url: `https://arbitrum-sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
        accounts: [process.env.PRIVATE_KEY_ADMIN],
        chainId: 421614, // Corrected Chain ID for Arbitrum Sepolia
        gas: "auto",
        gasPrice: "auto",
      },
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

module.exports = config;
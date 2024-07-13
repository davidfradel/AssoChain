const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

require('dotenv').config({path: '../.env'});

module.exports = buildModule("DeployContractsModule", (m) => {
  const baseURI = process.env.IPFS_BASE_URI;
  const initialSupply = ethers.parseUnits("1000000", 18).toString();
  const userManagement = m.contract("UserManagement", [baseURI, initialSupply]);

  return { userManagement };
});
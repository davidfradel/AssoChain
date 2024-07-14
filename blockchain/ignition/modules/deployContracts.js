const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

require('dotenv').config({path: '../.env'});

module.exports = buildModule("DeployContractsModule", (m) => {
  const initialSupply = ethers.parseUnits("1000000", 18).toString();
  const userManagement = m.contract("UserManagement", [initialSupply]);

  return { userManagement };
});
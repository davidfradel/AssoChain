const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { ethers } = require("hardhat");

module.exports = buildModule("DeployContractsModule", (m) => {
  // Deploy soulBoundToken
  const soulBoundToken = m.contract("SoulBoundToken");

  // Deploy communityToken with initial supply
  const initialSupply = ethers.utils.parseUnits("1000000", 18).toString();
  const communityToken = m.contract("CommunityToken", [initialSupply]);

  // Deploy userManagement with references to the deployed tokens
  const userManagement = m.contract("UserManagement", [soulBoundToken, communityToken]);

  // Transfer ownership of SoulBoundToken to UserManagement
  m.call(soulBoundToken, "transferOwnership", {
    args: [userManagement],
    from: m.deployer
  });

  // Transfer ownership of CommunityToken to UserManagement
  m.call(communityToken, "transferOwnership", {
    args: [userManagement],
    from: m.deployer
  });

  return { soulBoundToken, communityToken, userManagement };
});

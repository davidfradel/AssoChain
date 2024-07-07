const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deploy Contracts", async (m) => {
  // Deploy soulBoundToken, communityToken and userManagement
  const soulBoundToken = await m.contract("SoulBoundToken");
  const communityToken = await m.contract("CommunityToken", [ethers.utils.parseEther("1000000")]);
  const userManagement = await m.contract("UserManagement", [soulBoundToken, communityToken]);

  // Transfert ownership of SoulBoundToken to UserManagement
  await m.call(soulBoundToken, "transferOwnership", {
    args: [userManagement.address],
    from: m.deployer
  });

   // Transfert ownership of CommunityToken to UserManagement
  await m.call(communityToken, "transferOwnership", {
    args: [userManagement.address],
    from: m.deployer
  });

  return { soulBoundToken, communityToken, userManagement };
});

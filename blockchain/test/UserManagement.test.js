const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserManagement", function () {
  let UserManagement, userManagement, owner, addr1;

  beforeEach(async function () {
    UserManagement = await ethers.getContractFactory("UserManagement");
    [owner, addr1] = await ethers.getSigners();
    userManagement = await UserManagement.deploy();
    await userManagement.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await userManagement.owner()).to.equal(owner.address);
    });

    it("Should have the correct registration fee", async function () {
      expect(await userManagement.registrationFee()).to.equal(ethers.utils.parseEther("0.001"));
    });
  });

  describe("Register User", function () {
    it("Should register a new user", async function () {
      await userManagement.connect(addr1).registerUser({ value: ethers.utils.parseEther("0.001") });
      const user = await userManagement.getUser(addr1.address);
      expect(user.isRegistered).to.equal(true);
      expect(user.userAddress).to.equal(addr1.address);
    });

    it("Should fail if registration fee is not sufficient", async function () {
      await expect(
        userManagement.connect(addr1).registerUser({ value: ethers.utils.parseEther("0.0001") })
      ).to.be.revertedWith("Insufficient registration fee");
    });

    it("Should fail if user is already registered", async function () {
      await userManagement.connect(addr1).registerUser({ value: ethers.utils.parseEther("0.001") });
      await expect(
        userManagement.connect(addr1).registerUser({ value: ethers.utils.parseEther("0.001") })
      ).to.be.revertedWith("User already registered");
    });
  });

  describe("Update Membership", function () {
    it("Should update membership expiry", async function () {
      await userManagement.connect(addr1).registerUser({ value: ethers.utils.parseEther("0.001") });
      await userManagement.updateMembership(addr1.address);
      const user = await userManagement.getUser(addr1.address);
      expect(user.membershipExpiry).to.be.gt((await ethers.provider.getBlock("latest")).timestamp);
    });

    it("Should fail if user is not registered", async function () {
      await expect(userManagement.updateMembership(addr1.address)).to.be.revertedWith("User not registered");
    });
  });

  describe("Remove User", function () {
    it("Should remove a user", async function () {
      await userManagement.connect(addr1).registerUser({ value: ethers.utils.parseEther("0.001") });
      await userManagement.removeUser(addr1.address);
      await expect(userManagement.getUser(addr1.address)).to.be.revertedWith("User not registered");
    });

    it("Should fail if user is not registered", async function () {
      await expect(userManagement.removeUser(addr1.address)).to.be.revertedWith("User not registered");
    });
  });

  describe("Administrative Actions", function () {
    it("Should allow owner to update registration fee", async function () {
      await userManagement.updateRegistrationFee(ethers.utils.parseEther("0.002"));
      expect(await userManagement.registrationFee()).to.equal(ethers.utils.parseEther("0.002"));
    });

    it("Should not allow non-owner to update registration fee", async function () {
      await expect(userManagement.connect(addr1).updateRegistrationFee(ethers.utils.parseEther("0.002"))).to.be.revertedWith(
        "OwnableUnauthorizedAccount"
      );
    });
  });
});

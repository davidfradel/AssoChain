const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserManagement", function () {
    let UserManagement, SoulBoundToken, CommunityToken, userManagement, soulBoundToken, communityToken, owner, addr1, addr2;

    before(async function () {
        SoulBoundToken = await ethers.getContractFactory("SoulBoundToken");
        CommunityToken = await ethers.getContractFactory("CommunityToken");
        UserManagement = await ethers.getContractFactory("UserManagement");

        [owner, addr1, addr2] = await ethers.getSigners();

        soulBoundToken = await SoulBoundToken.deploy();
        await soulBoundToken.deployed();

        communityToken = await CommunityToken.deploy(ethers.utils.parseEther("1000"));
        await communityToken.deployed();

        userManagement = await UserManagement.deploy(soulBoundToken.address, communityToken.address);
        await userManagement.deployed();

        await soulBoundToken.transferOwnership(userManagement.address);
        await communityToken.transferOwnership(userManagement.address);

        expect(await soulBoundToken.owner()).to.equal(userManagement.address);
        expect(await communityToken.owner()).to.equal(userManagement.address);
    });

    it("Should register a user and mint tokens correctly", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await userManagement.connect(addr1).registerUser(name, description, image, { value: ethers.utils.parseEther("0.001") });
        const user = await userManagement.getUser(addr1.address);
        expect(user.isRegistered).to.equal(true);

        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        const metadata = await soulBoundToken.getMetadata(tokenId);
        expect(metadata.name).to.equal(name);
    });

    it("Should activate a user correctly", async function () {
        await userManagement.connect(owner).activateUser(addr1.address);

        const user = await userManagement.getUser(addr1.address);
        expect(user.isActive).to.equal(true);

        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        const metadata = await soulBoundToken.getMetadata(tokenId);
        expect(metadata.tokenActivated).to.equal(true);

        const addr1CommunityBalance = await communityToken.balanceOf(addr1.address);
        expect(ethers.utils.formatEther(addr1CommunityBalance)).to.equal("20.0");
    });

    it("Should disable a user correctly", async function () {
        await userManagement.connect(owner).disableUser(addr1.address);
        const user = await userManagement.getUser(addr1.address);
        expect(user.isActive).to.equal(false);
    });

    it("Should update membership correctly", async function () {
        await userManagement.connect(owner).updateMembership(addr1.address);

        const user = await userManagement.getUser(addr1.address);
        expect(user.membershipExpiry).to.be.gt(Math.floor(Date.now() / 1000));

        const addr1CommunityBalance = await communityToken.balanceOf(addr1.address);
        expect(ethers.utils.formatEther(addr1CommunityBalance)).to.equal("40.0");
    });

    it("Should revert if activating a user not registered", async function () {
        await expect(userManagement.activateUser(addr2.address)).to.be.revertedWith("User not registered");
    });

    it("Should revert if disable a user not registered", async function () {
        await expect(userManagement.disableUser(addr2.address)).to.be.revertedWith("User not registered");
    });

    it("Should revert if updating membership for a user not registered", async function () {
        await expect(userManagement.updateMembership(addr2.address)).to.be.revertedWith("User not registered");
    });

    it("Should return zero address for non-existent token in getOwnerOf", async function () {
        const tokenId = ethers.BigNumber.from(addr2.address).toString();
        expect(await soulBoundToken.ownerOf(tokenId)).to.equal(ethers.constants.AddressZero);
    });

    it("Should handle registration fee update correctly", async function () {
        const newFee = ethers.utils.parseEther("0.002");
        await userManagement.updateRegistrationFee(newFee);
        expect(await userManagement.registrationFee()).to.equal(newFee);
    });
});


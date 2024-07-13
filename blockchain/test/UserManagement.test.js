const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("UserManagement", function () {
    let userManagement, owner, addr1, addr2, addr3;

    before(async function () {
        [owner, addr1, addr2, addr3] = await ethers.getSigners();

        const UserManagement = await ethers.getContractFactory("UserManagement");
        const baseURI = "ipfs://Qm...";
        const initialSupply = ethers.parseUnits("1000000", 18);
        
        userManagement = await UserManagement.deploy(baseURI, initialSupply);
        await userManagement.waitForDeployment();
        
        console.log("UserManagement deployed to:", userManagement.target);

        const communityTokenAddress = await userManagement.ctk();
        const communityToken = await ethers.getContractAt("CommunityToken", communityTokenAddress);
        const soulBoundTokenAddress = await userManagement.sbt();
        const soulBoundToken = await ethers.getContractAt("SoulBoundToken", soulBoundTokenAddress);

        expect(await communityToken.owner()).to.equal(userManagement.target);
        expect(await soulBoundToken.owner()).to.equal(userManagement.target);
    });

    it("Should register a user and mint tokens correctly", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await userManagement.connect(addr1).registerUser(name, description, image, { value: ethers.parseUnits("0.001", 18) });
        const user = await userManagement.getUser(addr1.address);
        expect(user.isRegistered).to.equal(true);
    });

    it("Should activate a user correctly", async function () {
        await userManagement.connect(owner).activateUser(addr1.address);

        const user = await userManagement.getUser(addr1.address);
        expect(user.isActive).to.equal(true);

        const communityTokenAddress = await userManagement.ctk();
        const communityToken = await ethers.getContractAt("CommunityToken", communityTokenAddress);
        const addr1CommunityBalance = await communityToken.balanceOf(addr1.address);
        expect(ethers.formatUnits(addr1CommunityBalance, 18)).to.equal("10.0");
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

        const communityTokenAddress = await userManagement.ctk();
        const communityToken = await ethers.getContractAt("CommunityToken", communityTokenAddress);
        const addr1CommunityBalance = await communityToken.balanceOf(addr1.address);
        expect(ethers.formatUnits(addr1CommunityBalance, 18)).to.equal("30.0");
    });

    it("Should revert if activating a user not registered", async function () {
        await expect(userManagement.activateUser(addr2.address)).to.be.revertedWith("User not registered");
    });

    it("Should revert if disabling a user not registered", async function () {
        await expect(userManagement.disableUser(addr2.address)).to.be.revertedWith("User not registered");
    });

    it("Should revert if updating membership for a user not registered", async function () {
        await expect(userManagement.updateMembership(addr2.address)).to.be.revertedWith("User not registered");
    });

    it("Should return zero address for non-existent token in getOwnerOf", async function () {
        const owner = await userManagement.getOwnerOf(addr2.address);
        expect(owner).to.equal(ethers.ZeroAddress);
    });

    it("Should return an address for existent token in getOwnerOf", async function () {
        const owner = await userManagement.getOwnerOf(addr1.address);
        expect(owner).to.equal(addr1.address);
    });

    it("Should handle registration fee update correctly", async function () {
        const newFee = ethers.parseUnits("0.002", 18);
        await userManagement.updateRegistrationFee(newFee);
        expect(await userManagement.registrationFee()).to.equal(newFee);
    });

    it("Should handle membership fee update correctly", async function () {
        const name = "User Name 2";
        const description = "User Description 2";
        const image = "ipfs://Qm...";

        await userManagement.connect(addr2).registerUser(name, description, image, { value: ethers.parseUnits("0.002", 18) });
        await userManagement.connect(owner).activateUser(addr2.address);

        await userManagement.connect(addr3).registerUser(name, description, image, { value: ethers.parseUnits("0.002", 18) });
        await userManagement.connect(owner).activateUser(addr3.address);

        const users = await userManagement.getAllUsers();
        expect(users).to.have.lengthOf(2);
        expect(users[0].userAddress).to.equal(addr2.address);
        expect(users[0].isRegistered).to.equal(true);
        expect(users[0].isActive).to.equal(true);
        expect(users[1].userAddress).to.equal(addr3.address);
        expect(users[1].isRegistered).to.equal(true);
        expect(users[1].isActive).to.equal(true);

        const userAddresses = await userManagement.getAllUserAddresses();
        expect(userAddresses).to.have.lengthOf(2);
        expect(userAddresses).to.include(addr2.address);
        expect(userAddresses).to.include(addr3.address);
    });

    it("Should check if a user is subscribed", async function () {
        const isSubscribed = await userManagement.isSubscribed(addr1.address);
        expect(isSubscribed).to.equal(true);
    });

    it("Should renew the subscription of a user", async function () {
        // Simulate 30 days passing
        const user = await userManagement.getUser(addr1.address);
        const currentTime = BigInt(Math.floor(Date.now() / 1000));
        const timeToAdvance = user.membershipExpiry - currentTime - BigInt(30 * 24 * 60 * 60); // go back 30 days

        await ethers.provider.send("evm_increaseTime", [Number(timeToAdvance)]);
        await ethers.provider.send("evm_mine");

        await userManagement.connect(owner).renewSubscription(addr1.address);

        const subscriptionEndTime = await userManagement.getSubscriptionEndTime(addr1.address);
        expect(subscriptionEndTime).to.be.gt(Math.floor(Date.now() / 1000));
    });

    it("Should get the subscription end time of a user", async function () {
        const subscriptionEndTime = await userManagement.getSubscriptionEndTime(addr1.address);
        expect(subscriptionEndTime).to.be.gt(0);
    });

    it("Should get the metadata of a user", async function () {
        const metadata = await userManagement.getMetadata(addr1.address);
        expect(metadata.name).to.equal("User Name");
        expect(metadata.description).to.equal("User Description");
    });
});
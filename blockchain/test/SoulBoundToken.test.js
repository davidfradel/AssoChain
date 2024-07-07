const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoulBoundToken", function () {
    let SoulBoundToken, soulBoundToken, owner, addr1;

    beforeEach(async function () {
        SoulBoundToken = await ethers.getContractFactory("SoulBoundToken");
        [owner, addr1] = await ethers.getSigners();

        soulBoundToken = await SoulBoundToken.deploy();
        await soulBoundToken.deployed();
    });

    it("Should mint a token and set metadata correctly", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await soulBoundToken.mint(addr1.address, name, description, image);

        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        const metadata = await soulBoundToken.getMetadata(tokenId);
        expect(metadata.name).to.equal(name);
        expect(metadata.description).to.equal(description);
        expect(metadata.image).to.equal(image);
        expect(metadata.tokenActivated).to.equal(false);

        const isSubscribed = await soulBoundToken.isSubscribed(tokenId);
        expect(isSubscribed).to.equal(false);

        const endTime = await soulBoundToken.getSubscriptionEndTime(tokenId);
        expect(endTime).to.be.eq(0);
    });

    it("Should activate a token correctly", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await soulBoundToken.mint(addr1.address, name, description, image);

        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await soulBoundToken.activateToken(tokenId);

        const metadata = await soulBoundToken.getMetadata(tokenId);
        expect(metadata.tokenActivated).to.equal(true);
    });

    it("Should not allow transfer of tokens", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await soulBoundToken.mint(addr1.address, name, description, image);

        const tokenId = ethers.BigNumber.from(addr1.address).toString();

        await Promise.all([ 
        expect(
            soulBoundToken["safeTransferFrom(address,address,uint256)"](addr1.address, owner.address, tokenId)
        ).to.be.revertedWith("Soul Bound Token cannot be transferred"),
        expect(
            soulBoundToken["transferFrom(address,address,uint256)"](addr1.address, owner.address, tokenId)
        ).to.be.revertedWith("Soul Bound Token cannot be transferred")]);
    });

    it("Should renew subscription correctly", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await soulBoundToken.mint(addr1.address, name, description, image);
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await soulBoundToken.activateToken(tokenId);

        const metadataBefore = await soulBoundToken.getMetadata(tokenId);
        const initialEndTime = metadataBefore.subscriptionPeriods[metadataBefore.subscriptionPeriods.length - 1].endTime;

        // Advance time by one year and one day
        await ethers.provider.send("evm_increaseTime", [365 * 24 * 60 * 60 + 1]);
        await ethers.provider.send("evm_mine", []);

        await soulBoundToken.renewSubscription(tokenId);

        const metadata = await soulBoundToken.getMetadata(tokenId);
        const currentTime = Math.floor(Date.now() / 1000);
        expect(metadata.subscriptionPeriods[metadata.subscriptionPeriods.length - 1].endTime).to.be.gt(currentTime);

        const newEndTime = metadata.subscriptionPeriods[metadata.subscriptionPeriods.length - 1].endTime;
        // Check if subscription was renewed for one year
        const oneYearInSeconds = 365 * 24 * 60 * 60;
        expect(newEndTime.toNumber()).to.be.closeTo(initialEndTime.toNumber() + oneYearInSeconds, 5);
    });

    it("Should not renew subscription before the last month", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await soulBoundToken.mint(addr1.address, name, description, image);
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await soulBoundToken.activateToken(tokenId);

        // Advance time by 11 months
        await ethers.provider.send("evm_increaseTime", [11 * 30 * 24 * 60 * 60]);
        await ethers.provider.send("evm_mine", []);

        await expect(soulBoundToken.renewSubscription(tokenId)).to.be.revertedWith(
            "Renewal only allowed in the last month of subscription"
        );
    });

    it("Should get subscription end time correctly", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await soulBoundToken.mint(addr1.address, name, description, image);
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await soulBoundToken.activateToken(tokenId);

        const endTime = await soulBoundToken.getSubscriptionEndTime(tokenId);
        expect(endTime).to.be.gt(0);
    });

    it("Should check if token is subscribed correctly", async function () {
        const name = "User Name";
        const description = "User Description";
        const image = "ipfs://Qm...";

        await soulBoundToken.mint(addr1.address, name, description, image);
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await soulBoundToken.activateToken(tokenId);

        const isSubscribed = await soulBoundToken.isSubscribed(tokenId);
        expect(isSubscribed).to.equal(true);
    });

    it("Should revert when checking subscription status for non-existent token", async function () {
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await expect(soulBoundToken.isSubscribed(tokenId)).to.be.revertedWith("Token does not exist");
    });

    it("Should revert if activating a non-existent token", async function () {
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await expect(soulBoundToken.activateToken(tokenId)).to.be.revertedWith("Token does not exist");
    });

    it("Should revert if renewing a non-existent token", async function () {
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await expect(soulBoundToken.renewSubscription(tokenId)).to.be.revertedWith("Token does not exist");
    });

    it("Should revert if getting subscription end time for non-existent token", async function () {
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await expect(soulBoundToken.getSubscriptionEndTime(tokenId)).to.be.revertedWith("Token does not exist");
    });

    it("Should revert if getting metadata for non-existent token", async function () {
        const tokenId = ethers.BigNumber.from(addr1.address).toString();
        await expect(soulBoundToken.getMetadata(tokenId)).to.be.revertedWith("Token does not exist");
    });
});

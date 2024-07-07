const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CommunityToken", function () {
    this.timeout(60000);

    let CommunityToken, communityToken, owner, addr1;

    beforeEach(async function () {
        CommunityToken = await ethers.getContractFactory("CommunityToken");
        [owner, addr1] = await ethers.getSigners();
        communityToken = await CommunityToken.deploy(ethers.utils.parseEther("1000"));
        await communityToken.deployed();
    });

    it("Should have correct initial supply", async function () {
        const ownerBalance = await communityToken.balanceOf(owner.address);
        expect(ethers.utils.formatEther(ownerBalance)).to.equal("1000.0");
    });

    it("Should allow owner to mint tokens", async function () {
        await communityToken.connect(owner).mint(addr1.address, ethers.utils.parseEther("100"));

        const addr1Balance = await communityToken.balanceOf(addr1.address);
        expect(ethers.utils.formatEther(addr1Balance)).to.equal("100.0");
    });

    it("Should not allow non-owner to mint tokens", async function () {
        await expect(
            communityToken.connect(addr1).mint(addr1.address, ethers.utils.parseEther("100"))
        ).to.be.revertedWith("OwnableUnauthorizedAccount");
    });
});

import { expect } from "chai";
import { ethers } from "hardhat";

describe("SaveAsset", function () {
    let saveAsset: any;
    let token: any;
    let owner: any;
    let user: any;

    beforeEach(async function () {
        [owner, user] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("ERC20Token");
        token = await Token.deploy("MilwalToken", "MTK", 18, ethers.parseEther("1000"));
        await token.waitForDeployment();

        const SaveAsset = await ethers.getContractFactory("SaveAsset");
        saveAsset = await SaveAsset.deploy(await token.getAddress());
        await saveAsset.waitForDeployment();
    });

    it("should deposit ETH", async function () {
        const amount = ethers.parseEther("1");
        await saveAsset.connect(user).deposit({ value: amount });
        expect(await saveAsset.connect(user).getUserSavings()).to.equal(amount);
    });
    it("should revert deposit with zero value", async function () {
        await expect(saveAsset.connect(user).deposit({ value: 0 })).to.be.revertedWith("Can't deposit zero value");
    });

    it("should withdraw ETH", async function () {
        const amount = ethers.parseEther("1");
        await saveAsset.connect(user).deposit({ value: amount });
        await saveAsset.connect(user).withdraw(amount);
        expect(await saveAsset.connect(user).getUserSavings()).to.equal(0);
    });

    it("should revert withdrawal with insufficient funds", async function () {
        await expect(saveAsset.connect(user).withdraw(ethers.parseEther("1"))).to.be.revertedWith("Insufficient funds");
    });

    it("should deposit ERC20", async function () {
        const amount = ethers.parseEther("100");
        await token.transfer(user.address, amount);
        await token.connect(user).approve(await saveAsset.getAddress(), amount);
        await saveAsset.connect(user).depositERC20(amount);
        expect(await saveAsset.connect(user).getErc20SavingsBalance()).to.equal(amount);
    });

    it("should withdraw ERC20", async function () {
        const amount = ethers.parseEther("100");
        await token.transfer(user.address, amount);
        await token.connect(user).approve(await saveAsset.getAddress(), amount);
        await saveAsset.connect(user).depositERC20(amount);
        await saveAsset.connect(user).withdrawERC20(amount);
        expect(await saveAsset.connect(user).getErc20SavingsBalance()).to.equal(0);
    });

    it("should return contract balance", async function () {
        const amount = ethers.parseEther("2");
        await saveAsset.connect(user).deposit({ value: amount });
        expect(await saveAsset.getContractBalance()).to.equal(amount);
    });
});

import { time, loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("Chlorine", function () {
  async function deploySchoolManagement() {
    const [joy, staff, student] = await hre.ethers.getSigners();

    const ERC20Token = await hre.ethers.getContractFactory("ERC20Token");
    const token = await ERC20Token.deploy("HeliumToken", "HTK", 18, 1_000_000_000n * 10n ** 18n);

    const Chlorine = await hre.ethers.getContractFactory("Chlorine");
    const chlorine = await Chlorine.deploy(await token.getAddress());

    const fundAmount = hre.ethers.parseEther("1000000");
    await token.transfer(await chlorine.getAddress(), fundAmount);

    return { chlorine: chlorine as any, token, joy, staff, student };
  }

  describe("School Management", function () {
    it("Should set the right owner", async function () {
      const { chlorine, joy } = await loadFixture(deploySchoolManagement);
      expect(await chlorine.owner()).to.equal(joy.address);
    });

    it("Should restrict payStaff to only the owner", async function () {
      const { chlorine, staff } = await loadFixture(deploySchoolManagement);

      await expect(chlorine.connect(staff).payStaff(1)).to.be.revertedWith("Not the owner");
    });

    it("Should add staff and pay staff successfully", async function () {
      const { chlorine, token, joy, staff } = await loadFixture(deploySchoolManagement);

      await chlorine.connect(joy).addStaff("John Doe", staff.address);

      const salary = hre.ethers.parseEther("5000");

      await expect(chlorine.connect(joy).payStaff(1)).to.not.be.reverted;

      const staffBalance = await token.balanceOf(staff.address);
      expect(staffBalance).to.equal(salary);
    });

    it("Should not pay staff again within 14 days", async function () {
      const { chlorine, joy, staff } = await loadFixture(deploySchoolManagement);

      await chlorine.connect(joy).addStaff("John Doe", staff.address);
      await chlorine.connect(joy).payStaff(1);

      await expect(chlorine.connect(joy).payStaff(1)).to.be.revertedWith(
        "Staff already paid within the last 14 days",
      );
    });

    it("Should allow paying staff again after 14 days", async function () {
      const { chlorine, token, joy, staff } = await loadFixture(deploySchoolManagement);

      await chlorine.connect(joy).addStaff("John Doe", staff.address);

      const salary = hre.ethers.parseEther("5000");

      await chlorine.connect(joy).payStaff(1);

      await time.increase(14 * 24 * 60 * 60);

      await chlorine.connect(joy).payStaff(1);

      const staffBalance = await token.balanceOf(staff.address);
      expect(staffBalance).to.equal(salary * 2n);
    });

    it("Should register a student and collect the correct fee", async function () {
      const { chlorine, token, joy, student } = await loadFixture(deploySchoolManagement);

      const fee = hre.ethers.parseEther("1000");

      await token.transfer(student.address, fee);
      await token.connect(student).approve(await chlorine.getAddress(), fee);

      await chlorine.connect(student).registerStudent("Alice", 100);

      const studentBalance = await token.balanceOf(student.address);
      const chlorineBalance = await token.balanceOf(await chlorine.getAddress());

      expect(studentBalance).to.equal(0n);
      expect(chlorineBalance).to.be.gte(fee);
    });
  });
});

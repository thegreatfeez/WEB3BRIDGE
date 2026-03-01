const helpers = require("@nomicfoundation/hardhat-network-helpers");
import { ethers } from "hardhat";

const main = async () => {
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const ETHHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

  await helpers.impersonateAccount(ETHHolder);
  const impersonatedSigner = await ethers.getSigner(ETHHolder);
}
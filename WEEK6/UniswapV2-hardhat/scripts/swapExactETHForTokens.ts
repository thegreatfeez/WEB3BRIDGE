const helpers = require("@nomicfoundation/hardhat-network-helpers");
import { ethers } from "hardhat";

const main = async () => {
  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const TokenHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

  await helpers.impersonateAccount(TokenHolder);
  const impersonatedSigner = await ethers.getSigner(TokenHolder);

  const USDC = await ethers.getContractAt(
    "IERC20",
    USDCAddress,
    impersonatedSigner
  );

  const UniRouterContract = await ethers.getContractAt(
    "IUniswapV2Router",
    UNIRouter,
    impersonatedSigner
  );

  const amountOutMin = ethers.parseUnits("500", 6);
  const ethAmount = ethers.parseEther("0.5");

  const path = [WETHAddress, USDCAddress];

  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

  const usdcBalanceBefore = await USDC.balanceOf(impersonatedSigner);
  const ethBalanceBefore = await ethers.provider.getBalance(
    impersonatedSigner
  );

  console.log("=======Before============");
  console.log("ETH balance before", ethers.formatEther(ethBalanceBefore));
  console.log("USDC balance before", ethers.formatUnits(usdcBalanceBefore, 6));

  const transaction = await UniRouterContract.swapExactETHForTokens(
    amountOutMin,
    path,
    impersonatedSigner.address,
    deadline,
    {
      value: ethAmount,
    }
  );

  await transaction.wait();

  console.log("=======After============");
  const usdcBalanceAfter = await USDC.balanceOf(impersonatedSigner);
  const ethBalanceAfter = await ethers.provider.getBalance(impersonatedSigner);
  console.log("ETH balance after", ethers.formatEther(ethBalanceAfter));
  console.log("USDC balance after", ethers.formatUnits(usdcBalanceAfter, 6));

  console.log("=========Difference==========");
  const newUsdcValue = usdcBalanceAfter - usdcBalanceBefore;
  const ethSpent = ethBalanceBefore - ethBalanceAfter;
  console.log("USDC received:", ethers.formatUnits(newUsdcValue, 6));
  console.log("ETH spent:", ethers.formatEther(ethSpent));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const helpers = require("@nomicfoundation/hardhat-network-helpers");
import { ethers } from "hardhat";

const main = async () => {
  const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const WETHAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  const TokenHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

  await helpers.impersonateAccount(TokenHolder);
  const impersonateAccount = await ethers.getSigner(TokenHolder);

  const USDC = await ethers.getContractAt(
    "IERC20",
    USDCAddress,
    impersonateAccount
  );

  const UniRouterContract = await ethers.getContractAt(
    "IUniswapV2Router",
    UNIRouter,
    impersonateAccount
  );

  const amountOut = ethers.parseEther("1");
  const amountInMax = ethers.parseUnits("3500", 6);
  const path = [USDCAddress, WETHAddress];
  const deadline = Math.floor(Date.now() / 1000) + 60 * 10;

  const USDCBalanceBefore = await USDC.balanceOf(impersonateAccount);
  const ETHBalanceBefore = await ethers.provider.getBalance(
    impersonateAccount.address
  );

  await USDC.approve(UniRouterContract, amountInMax);

  console.log("=======Before============");
  console.log("ETH balance before", ethers.formatEther(ETHBalanceBefore));
  console.log("USDC balance before", ethers.formatUnits(USDCBalanceBefore, 6));

  const tx = await UniRouterContract.swapTokensForExactETH(
    amountOut,
    amountInMax,
    path,
    impersonateAccount.address,
    deadline
  );

  await tx.wait();

  const USDCBalanceAfter = await USDC.balanceOf(impersonateAccount.address);
  const ETHBalanceAfter = await ethers.provider.getBalance(
    impersonateAccount.address
  );

  console.log("=======After============");
  console.log("ETH balance after", ethers.formatEther(ETHBalanceAfter));
  console.log("USDC balance after", ethers.formatUnits(USDCBalanceAfter, 6));

  console.log("=========Difference==========");
  const newUSDCValue = USDCBalanceAfter - USDCBalanceBefore;
  const newETHValue = ETHBalanceAfter - ETHBalanceBefore;

  console.log("USDC SPENT: ", ethers.formatUnits(newUSDCValue, 6));
  console.log("ETH RECEIVED: ", ethers.formatEther(newETHValue));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

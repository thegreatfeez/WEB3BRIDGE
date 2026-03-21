const helpers = require("@nomicfoundation/hardhat-network-helpers");
import { ethers } from "hardhat";

const main = async () => {
const USDCAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
const DAIAddress = "0x6b175474e89094c44da98b954eedeac495271d0f";
const UNIRouter = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
const TokenHolder = "0xf584f8728b874a6a5c7a8d4d387c9aae9172d621";

await helpers.impersonateAccount(TokenHolder);
const impersonateAccount = await ethers.getSigner(TokenHolder);

const USDC = await ethers.getContractAt(
    "IERC20",
    USDCAddress,
    impersonateAccount
  );

  const DAI = await ethers.getContractAt(
    "IERC20",
    DAIAddress,
    impersonateAccount
  );

   const UniRouterContract = await ethers.getContractAt(
    "IUniswapV2Router",
    UNIRouter,
    impersonateAccount
  );

  const amountIn = ethers.parseUnits("1000", 6);
  const amountOutmin = ethers.parseUnits("900", 18);
  const path = [USDCAddress, DAIAddress];
  const deadline = Math.floor(Date.now()/1000) + 60 * 10;

const USDCBalanceBefore = await USDC.balanceOf(impersonateAccount);
const DAIBalanceBefore = await DAI.balanceOf(impersonateAccount);

await USDC.approve(UniRouterContract, amountIn);

  console.log("=======Before============");

  console.log("weth balance before", Number(DAIBalanceBefore));
  console.log("usdc balance before", Number(USDCBalanceBefore));

  const tx = await UniRouterContract.swapExactTokensForTokens(
        amountIn,
        amountOutmin,
        path,
        impersonateAccount.address,
        deadline
  )

  await tx.wait();

  const USDCBalanceAfter = await USDC.balanceOf(impersonateAccount.address);
  const DAIBalanceAfter = await DAI.balanceOf(impersonateAccount.address);

  console.log("=======After============");
  console.log("dai balance after", Number(DAIBalanceAfter));
  console.log("usdc balance after", Number(USDCBalanceAfter));

  console.log("=========Difference==========");
  const newUSDCValue = USDCBalanceAfter - USDCBalanceBefore;
  const newDAIValue = DAIBalanceAfter - DAIBalanceBefore;

  console.log("NEW USDC BALANCE: ", ethers.formatUnits(newUSDCValue, 6));
  console.log("NEW DAI BALANCE: ", ethers.formatUnits(newDAIValue, 18));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
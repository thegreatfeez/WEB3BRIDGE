import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { LISK_SEPOLIA_URL, ARC_TESTNET_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.30",
  networks: {
    liskSepolia: {
      url: `${LISK_SEPOLIA_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 4202,
    },
    arcTestnet: {
      url: `${ARC_TESTNET_URL}`,
      accounts: [`0x${PRIVATE_KEY}`],
      chainId: 5042002,
    },
  },
};

export default config;

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { CELO_ALFAJORES_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.30",
  networks: {
    alfajores: {
      url: `${CELO_ALFAJORES_URL}`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};

export default config;
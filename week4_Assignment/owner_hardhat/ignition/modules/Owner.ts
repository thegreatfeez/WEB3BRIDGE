// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://v2.hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OwnerModule = buildModule("StorageModule", (m) => {
  const owner = m.contract("Owner");

  return { owner };
});

export default OwnerModule;
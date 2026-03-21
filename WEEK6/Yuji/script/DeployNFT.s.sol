// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script} from "forge-std/Script.sol";
import {YujiNFT} from "../src/YujiNFT.sol";

contract DeployNFT is Script {
    function run() public {
        string memory tokenUri = "ipfs://QmUpZ6KU4WJZXQ9seWB9VdXAjXQcpDCCwYvnxcHinmdCvD";
        vm.startBroadcast();
        YujiNFT nft = new YujiNFT();
        nft.mintNFT(tokenUri);
        vm.stopBroadcast();
    }
}

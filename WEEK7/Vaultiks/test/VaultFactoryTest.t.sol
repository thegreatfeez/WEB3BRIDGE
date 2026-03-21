// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../src/VaultFactory.sol";
import "../src/TokenVault.sol";
import "../src/VaultNFT.sol";


contract VaultFactoryTest is Test {

    address constant DAI  = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address DAI_WHALE = 0xfF663290Cf5c5E04F05B36f90e4B1c7018fA7299;
   

    VaultFactory factory;
    VaultNFT     nft;

    function setUp() public {
        vm.createSelectFork(vm.envString("MAINNET_RPC_URL"));
        string memory svgTemplate = vm.readFile("img/vaultNFT.svg");
        factory = new VaultFactory(svgTemplate);
        nft = factory.nft();
    }

    function testDepositUSDC() public {
        uint256 amount = 1000 * 1e18;
       

        vm.startPrank(DAI_WHALE);
        address vault = factory.deployVault(DAI);
        IERC20(DAI).approve(vault, amount);
        TokenVault(vault).deposit(amount);
        vm.stopPrank();

        uint256 tokenId = factory.tokenIdOf(vault);
        assertEq(nft.ownerOf(tokenId), DAI_WHALE);
        assertEq(TokenVault(vault).totalDeposited(), amount);
       
    }

    function testGetTokenURI() public {
        uint256 amount = 1000 * 1e18;

        vm.startPrank(DAI_WHALE);
        address vault = factory.deployVault(DAI);
        IERC20(DAI).approve(vault, amount);
        TokenVault(vault).deposit(amount);
        uint256 tokenId = factory.tokenIdOf(vault);
        vm.stopPrank();

        string memory image = nft.imageURI(tokenId);
        assertTrue(bytes(image).length > 0);
    }

   
}

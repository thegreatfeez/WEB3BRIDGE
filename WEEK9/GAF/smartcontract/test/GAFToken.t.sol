// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {GAFToken} from "../src/GAFToken.sol";

contract GAFTokenTest is Test {
    GAFToken public token;
    address internal gogo;
    address internal theo;

    function setUp() public {
        gogo = makeAddr("gogo");
        vm.prank(gogo);
        token = new GAFToken("GAFToken", "GFT");

       theo = makeAddr("theo");
    }

 
    function testOnlyOwnerCanMint() public {
        vm.expectRevert();
        vm.prank(theo);
        token.mint(1 ether);

        vm.prank(gogo);
        token.mint(1 ether);
    }

    function testRequestToken() public {
        vm.prank(gogo);
        token.mint(18 ether);

        vm.prank(theo);
        token.requestToken();

        assertEq(token.balanceOf(theo), 5 ether);
    }
}

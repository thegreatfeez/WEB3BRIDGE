// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Test} from "forge-std/Test.sol";
import {DeployScript} from "../script/DeployScript.s.sol";
import {Chlorine} from "../src/Chlorine.sol";
import {ERC20Token} from "../src/ERC20Token.sol";

contract ChlorineTest is Test {
    Chlorine public chlorine;
    ERC20Token public token;

    function setUp() public {
        DeployScript deployer = new DeployScript();
        deployer.run();
        chlorine = deployer.chlorine();
        token = deployer.token();
    }

    function testAddStaff() public {
        string memory name = "Betel";
        address account = makeAddr("betel");

        chlorine.addStaff(name, account);

        (uint8 id, string memory staffName, address staffAccount)= chlorine.staffs(0);
        assertEq(id, 1);
        assertEq(staffName, name);
        assertEq(staffAccount, account);
    }

    function testAddStaffWithAddressZero() public {
        vm.expectRevert("Invalid Account");
        chlorine.addStaff("Xedra", address(0));
    }

    function testRegisterStudent() public { 
        string memory name = "Mark David";
        address account = makeAddr(name);
        uint256 fee = chlorine.studentLevel(100);
        deal(address(token),account,fee);

        vm.startPrank(account);
        token.approve(address(chlorine), fee);
        chlorine.registerStudent(name, 100);
        vm.stopPrank();

        (uint8 id, string memory studentName, uint16 studentLevel)= chlorine.students(0);
        assertEq(id, 1 );
        assertEq(studentName, name);
        assertEq(studentLevel, 100);
    }

    function testPayStaff() public {
        address owner = chlorine.owner();
        
        deal(address(token), address(chlorine), 40_000e18);
        string memory name = "Nursca";
        address account = makeAddr("nursca");

        chlorine.addStaff(name, account);
        vm.prank(owner);
        chlorine.payStaff(1);

        assertEq(token.balanceOf(account),5000e18);
    }
}

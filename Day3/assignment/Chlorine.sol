//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20{
    function transfer(address _to, uint256 _value) external returns (bool success);
    function balanceOf(address _owner) external view returns (uint256);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
}

contract Chlorine{
    IERC20 public paymentToken;

    mapping(uint => uint) public studentLevel;

   uint256 private constant SALARY = 5000e18;

    address owner;

    constructor(address _tokenAddress){
        studentLevel[100] = 1000e18;
        studentLevel[200] = 3000e18;
        studentLevel[300] = 3500e18;
        studentLevel[400] = 4000e18;

    
        paymentToken = IERC20(_tokenAddress);
        owner = msg.sender;


    }

    modifier OnlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    struct Student{
        uint8 id;
        string name;
        uint8 level;
    }

    struct Staff{
        uint8 id;
        string name;
        address account;
    }

    Student[] public students;
    Staff[] public staffs;

    uint8 staff_id;
    uint8 student_id;

    function addStaff(string memory _name, address _account) external {
        require(_account != address(0), "Inalid Account");

        staff_id = staff_id + 1;
        Staff memory staff = Staff({id: staff_id, name: _name, account: _account});
        staffs.push(staff);
    }

    function payStaff(uint8 _id) external OnlyOwner{
        address staffAccount;
        for(uint i = 0; i < staffs.length; i++){
            if(staffs[i].id == _id){
                require(staffs[i].account != address(0), "Invalid Staff");
                staffAccount = staffs[i].account;
            }
        }
        require(staffAccount != address(0), "Staff Not Found");
        require(paymentToken.balanceOf(address(this)) >= SALARY, "Insufficient Fund");

        paymentToken.transfer(staffAccount, SALARY);
    }

    function getAllStaff() external view returns(Staff[] memory){
        return staffs;
    }

    function registerStudent(string memory _name, uint8 _level) external {
        require(
            _level == 100 || _level == 200 || _level == 300 || _level == 400,
            "Invalid level: must be 100, 200, 300, or 400"
        );

        uint256 fee = studentLevel[_level];
        require(fee > 0, "Fee not set for this level");

       
        bool success = paymentToken.transferFrom(msg.sender, address(this), fee);
        require(success, "Fee payment failed");

        student_id = student_id + 1;
        Student memory student = Student({
            id: student_id,
            name: _name,
            level: _level
        });
        students.push(student);
    }

    function getStudent(uint8 _id) external view returns (Student memory) {
        for (uint i = 0; i < students.length; i++) {
            if (students[i].id == _id) {
                return students[i];
            }
        }
        revert("Student not found");
    }

    function getAllStudents() external view returns (Student[] memory) {
        return students;
    }
}
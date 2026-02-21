//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20{
    function transfer(address _to, uint256 _value) external returns (bool success);
    function balanceOf(address _owner) external view returns (uint256);
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool success);
}

contract Chlorine{
    IERC20 public paymentToken;

    mapping(uint16 => uint256) public studentLevel;

   uint256 private constant SALARY = 5000e18;

    address public owner;

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

    enum StaffStatus {Active, Suspended}
    enum StaffPaymentStatus  { NotPaid, Paid }
    enum StudentRegStatus    { NotRegistered, Registered }
   

    struct Student{
        uint8 id;
        string name;
        uint16 level;
    }

    struct Staff{
        uint8 id;
        string name;
        address account;
        StaffStatus status;
    }

    Student[] public students;
    Staff[] public staffs;

    uint8 staff_id;
    uint8 student_id;

   
    mapping(uint8 => StaffPaymentStatus)  public staffPaymentStatus;
    mapping(uint8 => uint256)             public staffLastPaid;
    mapping(address => StudentRegStatus)  public studentRegStatus;
    mapping(address => StaffStatus)      public staffStatus;

    uint256 private constant PAY_INTERVAL = 14 days;
    

    function addStaff(string memory _name, address _account) external {
        require(_account != address(0), "Invalid Account");

        staff_id = staff_id + 1;
        Staff memory staff = Staff({id: staff_id, name: _name, account: _account, status: StaffStatus.Active});
        staffStatus[_account] = StaffStatus.Active;
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
        require(staffStatus[staffAccount] == StaffStatus.Active, "Staff not registered");

       
        require(
            staffPaymentStatus[_id] == StaffPaymentStatus.NotPaid ||
            block.timestamp >= staffLastPaid[_id] + PAY_INTERVAL,
            "Staff already paid within the last 14 days"
        );
      

        require(paymentToken.balanceOf(address(this)) >= SALARY, "Insufficient Fund");

      
        staffPaymentStatus[_id] = StaffPaymentStatus.Paid;
        staffLastPaid[_id]      = block.timestamp;
       

        paymentToken.transfer(staffAccount, SALARY);
    }

    function suspendStaff(address _account) external {
        bool found = false;
         for(uint i = 0; i < staffs.length; i++){
             if(_account == staffs[i].account){
             found = true;
             break; // i put break, so that the itiration will stop when i found the account, so gas will save.
             }
        }
        require(found, "No such staff as been registered in chlorine group of schools");
        staffStatus[_account] = StaffStatus.Suspended;
    }

    function getAllStaff() external view returns(Staff[] memory){
        return staffs;
    }

    function registerStudent(string memory _name, uint16 _level) external {
        require(
            _level == 100 || _level == 200 || _level == 300 || _level == 400,
            "Invalid level: must be 100, 200, 300, or 400"
        );

        
        require(
            studentRegStatus[msg.sender] == StudentRegStatus.NotRegistered,
            "Address already registered as a student"
        );
        

        uint256 fee = studentLevel[_level];
        require(fee > 0, "Fee not set for this level");

       
        bool success = paymentToken.transferFrom(msg.sender, address(this), fee);
        require(success, "Fee payment failed");

        
        studentRegStatus[msg.sender] = StudentRegStatus.Registered;
        

        student_id = student_id + 1;
        Student memory student = Student({
            id: student_id,
            name: _name,
            level: _level
        });
        students.push(student);
    }

    function removeStudent(uint8 _id) external {
        for (uint i; i < students.length; i++){
            if(students[i].id == _id){
                students[i] = students[(students.length) - 1];
                students.pop();
            }
        }
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
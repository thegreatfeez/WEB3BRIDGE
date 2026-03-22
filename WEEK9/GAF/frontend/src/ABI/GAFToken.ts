export const GAF_TOKEN_ABI = [
  // Constructor
  "constructor(string _name, string _symbol)",

  // View functions
  "function CLAIM_AMOUNT() view returns (uint256)",
  "function COOLDOWN() view returns (uint256)",
  "function MAX_SUPPLY() view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function owner() view returns (address)",
  "function balanceOf(address account) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function nextClaimTime(address) view returns (uint256)",

  // State mutating functions
  "function approve(address spender, uint256 value) returns (bool)",
  "function transfer(address to, uint256 value) returns (bool)",
  "function transferFrom(address from, address to, uint256 value) returns (bool)",
  "function mint(uint256 amount)",
  "function requestToken()",
  "function transferOwnership(address newOwner)",
  "function renounceOwnership()",

  // Events
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)",
  "event Claimed(address indexed user, uint256 amount, uint256 nextClaimTime)",

  // Errors
  "error AccessDeniedForOwners()",
  "error CooldownNotOver()",
  "error MaximumSupplyReached()",
  "error NotEnoughFunds()",
  "error ERC20InsufficientAllowance(address spender, uint256 allowance, uint256 needed)",
  "error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed)",
  "error ERC20InvalidApprover(address approver)",
  "error ERC20InvalidReceiver(address receiver)",
  "error ERC20InvalidSender(address sender)",
  "error ERC20InvalidSpender(address spender)",
  "error OwnableInvalidOwner(address owner)",
  "error OwnableUnauthorizedAccount(address account)",
] as const;
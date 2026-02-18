# Assignment

---

## Where Are Structs, Mappings, and Arrays Stored?

In Solidity, **state variables** (declared at the contract level) are stored in **persistent storage** — this means they live on the blockchain and persist between function calls.

```solidity
contract Example {
    // All stored in STORAGE (on-chain, persistent)
    struct Person {
        string name;
        uint age;
    }

    Person public person;           // struct    → storage
    mapping(address => uint) balances; // mapping → storage
    uint[] public numbers;          // array     → storage
}
```

When declared **inside a function**, variables can live in one of two temporary locations:

| Location | Description |
|----------|-------------|
| `memory` | Temporary, exists only during function execution |
| `calldata` | Read-only, used for external function parameters |

```solidity
function example(uint[] calldata inputData) external {
    uint[] memory tempArray = new uint[](5); // lives in memory, gone after function ends
    Person memory tempPerson = Person("Alice", 30); // temporary copy
}
```

---

## How Do They Behave When Executed or Called?

### Structs
- When read from **storage**, you get a **reference** to the original data — modifying it changes the state.
- When assigned to a **memory** variable, you get a **copy** — modifications do **not** affect storage.

```solidity
function updateStorage() public {
    Person storage p = person; // reference → changes affect state ✅
    p.age = 25;
}

function updateMemory() public view returns (string memory) {
    Person memory p = person; // copy → changes are lost after function ❌
    p.name = "Bob";
    return p.name; // returns "Bob" but original is unchanged
}
```

### Arrays
- **Storage arrays** are persistent and can be pushed to, popped, and modified across calls.
- **Memory arrays** must have a fixed size when created and cannot be resized.

```solidity
function addNumber(uint _num) public {
    numbers.push(_num); // modifies persistent storage array ✅
}

function tempArray() public pure returns (uint[] memory) {
    uint[] memory temp = new uint[](3); // fixed size, temporary ✅
    temp[0] = 1;
    return temp;
}
```

### Mappings
- Mappings always live in **storage** and are accessed via key lookups.
- They do **not** have a length and cannot be iterated over natively.
- Reading a key that has never been set returns the **default value** of the value type (e.g., `0` for `uint`, `false` for `bool`).

```solidity
function getBalance(address user) public view returns (uint) {
    return balances[user]; // returns 0 if user never set, no error
}
```

---

## Why Don't You Need to Specify `memory` or `storage` for Mappings?

Mappings **cannot** exist in `memory` — this is a **Solidity language restriction**.

The reasons are:

1. **Mappings use a hash-based storage layout** — every key is hashed to compute a unique storage slot. This mechanism is tied directly to the EVM's persistent storage and cannot be replicated in memory.

2. **Mappings have no bounded size** — memory in Solidity must be allocated with a known size. Since a mapping can have an unbounded number of keys, there is no way to allocate it in memory.

3. **They are always implicitly in storage** — because mappings can only ever exist as state variables (or within structs that are in storage), Solidity already knows their location. Requiring the developer to write `storage` would be redundant.

```solidity
// ✅ Valid — mapping as a state variable (implicitly storage)
mapping(address => uint) public balances;

// ❌ Invalid — this will NOT compile
function test() public {
    mapping(address => uint) memory tempMap; // ERROR: mappings cannot be in memory
}
```

> **Summary:** Solidity omits the `memory`/`storage` keyword for mappings because they have only one possible location — **storage** — making the keyword unnecessary.
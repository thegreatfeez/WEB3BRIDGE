function gcd(x, y) {
    while (y !== 0) {
        [x, y] = [y, x % y];
    }
    return x;
}

const x = 16261;
const y = 85652;
console.log("gcd =", gcd(x, y));
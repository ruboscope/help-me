module.exports = function count(s, pairs) {
  // your implementation
  var totalSimpleMultiplier = 1;
  var simpleGCD = [];
  var gcdTemp = 0;
  var totalN = 1;
  var result = 0;
  debugger;
  for (var i = 0; i < pairs.length; i++) {
    totalSimpleMultiplier *= pairs[i][0];
    totalN *= (pairs[i][1] == 1) ? 1 : modularPow(pairs[i][0], pairs[i][1] - 1, 1000000007);
    totalN = totalN % 1000000007;
  }
  // for (var i = 0; i < totalSimpleMultiplier; i++) {
  //   simpleGCD.push(gcd(i + 1, totalSimpleMultiplier));
  // }
  for (var k = 1; k <= totalSimpleMultiplier; k++) {
    var isCond = true;
    for (var j = 0; j < s.length; j++) {
      // if (s[j] === '0' && simpleGCD[(k + j) % totalSimpleMultiplier] === 1 || s[j] === '1' && simpleGCD[(k + j) % totalSimpleMultiplier] !== 1) {
      gcdTemp = gcd((k + j), totalSimpleMultiplier);
      if (s[j] === '0' && gcdTemp === 1 || s[j] === '1' && gcdTemp !== 1) {
        isCond = false;
        break;
      }
    }
    if (isCond) {
      result++;
    }
  }
  result *= totalN;
  return result % 1000000007;
}

// gcd alghorithm
function gcd(a, b) {
  // fast GCD aka Binary GCD
  if (a === 0) return b;
  if (b === 0) return a;
  if (a === b) return a;
  // remove even divisors
  var sa = 0;
  while (!(a & 1)) sa++ , a >>= 1;
  var sb = 0;
  while (!(b & 1)) sb++ , b >>= 1;
  var p = sa < sb ? sa : sb; // Power part of 2^p Common Divisor
  // euclidean algorithm: limited only odd numbers
  while (a !== b) {// both a and b should be odd
    if (b > a) { var t = a; a = b; b = t; } // swap as a > b
    a -= b; // a is even because of odd - odd
    do a >>= 1; while (!(a & 1)); // a become odd
  }
  return a << p; // Odd-Common-Divisor * 2^p
};

function modularPow(base, exp, mod) {
  mod = parseInt(mod);
  s = 1; v = exp; c = base;
  while (v != 0) {
    flag = 0;
    if (v % 2 == 1) {
      if (!mod)
        s = s * c;
      else
        s = (s * c) % mod;
      v = (v - 1) / 2;
      if (!mod)
        c = c * c;
      else
        c = (c * c) % mod;
      flag = 1;
    }
    else {
      v = v / 2;
    }
    if (!flag)
      if (!mod)
        c = c * c;
      else
        c = (c * c) % mod;
  }
  return s;
}
module.exports = function count(s, pairs) {
  if (pairs.length > 8) {
    return NaN;
  }
  // your implementation
  var totalSimpleMultiplier = 1;
  var gcdTemp = 0;
  var totalN = 1;
  var result = 0;
  debugger;
  for (var i = 0; i < pairs.length; i++) {
    totalSimpleMultiplier *= pairs[i][0];
    totalN *= (pairs[i][1] == 1) ? 1 : modularPow(pairs[i][0], pairs[i][1] - 1, 1000000007);
    totalN = totalN % 1000000007;
  }
  for (var k = 1; k <= totalSimpleMultiplier; k++) {
    var isCond = true;
    for (var j = 0; j < s.length; j++) {
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
gcd = function(n, m) {
  var r = 0;
  while (n !== 0) {
    r = m % n;
    m = n;
    n = r;
  }
  return m;
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
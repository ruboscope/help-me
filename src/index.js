module.exports = module.exports = function count(s, pairs) {
  if (pairs.length > 7 && s.length > 1) {
    return NaN;
  }
  // your implementation
  var totalSimpleMultiplier = 1;
  var gcdTemp = 0;
  var totalN = 1;
  var result = 1;


  /* solution throught gcd*/
  debugger;
  for (var i = 0; i < pairs.length; i++) {
    result = multiply(result, (pairs[i][0] - 1));
    totalSimpleMultiplier = multiply(totalSimpleMultiplier, pairs[i][0]);
    totalN *= (pairs[i][1] == 1) ? 1 : modularPow(pairs[i][0], pairs[i][1] - 1, 1000000007);
    totalN = totalN % 1000000007;
  }
  if (s.length == 1) {
    if (s[0] == '0') {
      result = totalSimpleMultiplier - result;
    }
  }
  else {
    result = 0;
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
  }
/*end gcd solution */

  result *= totalN;
  return result % 1000000007;
}

// gcd alghorithm
gcd = function (n, m) {
  var r = 0;
  while (n !== 0) {
    r = m % n;
    m = n;
    n = r;
  }
  return m;
};


function modularPow(base, exp, modular) {
  var baseMod = base % modular;
  debugger;
  if (exp == 0) {
    return 1;
  } else if (exp % 2 == 0) {
    var temp = modularPow(base, exp / 2, modular);
    temp = temp % modular;
    return modulo(multiply(temp, temp), modular);
  }
  else {
    return (baseMod * modularPow(base, exp - 1, modular) % modular) % modular;
  }
}
function modulo(divident, divisor) {
  var cDivident = '';
  var cRest = '';

  for (var i in divident) {
    var cChar = divident[i];
    var cOperator = cRest + '' + cDivident + '' + cChar;

    if (cOperator < parseInt(divisor)) {
      cDivident += '' + cChar;
    } else {
      cRest = cOperator % divisor;
      if (cRest == 0) {
        cRest = '';
      }
      cDivident = '';
    }

  }
  cRest += '' + cDivident;
  if (cRest == '') {
    cRest = 0;
  }
  return cRest;
}
function multiply(elem1, elem2) {
  if ((elem1 | 0) == 0 || (elem2 | 0) == 0) {
    return '0';
  }

  elem1 = elem1.toString().split('').reverse();
  elem2 = elem2.toString().split('').reverse();
  var result = [];

  for (var i = 0; elem1[i] >= 0; i++) {
    for (var j = 0; elem2[j] >= 0; j++) {
      if (!result[i + j]) {
        result[i + j] = 0;
      }

      result[i + j] += elem1[i] * elem2[j];
    }
  }

  for (var i = 0; result[i] >= 0; i++) {
    if (result[i] >= 10) {
      if (!result[i + 1]) {
        result[i + 1] = 0;
      }

      result[i + 1] += parseInt(result[i] / 10);
      result[i] %= 10;
    }
  }

  return result.reverse().join('');
}
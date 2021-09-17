exports.isAValidCidr = cidr => {
  if (isNaN(cidr)) {
    return false;
  }
  cidr = +cidr
  return (
    (cidr % 1 === 0) &&
    (cidr >= 1 && cidr <= 32)
  );
}

exports.maskToCidr = mask => {
  return mask.split('.')
    .map(octet => {
      return dec2bin(octet)
        .split('')
        .reduce((a, c) => +a + +c, 0)
    })
    .reduce((a, c) => a + c, 0);
}

const dec2bin = dec => {
  return (dec >> 0).toString(2)
}

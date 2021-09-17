exports.isAValidCidr = (cidr) => {
  if (isNaN(cidr)) {
    return false;
  }
  cidr = +cidr
  return (
    (cidr % 1 === 0) &&
    (cidr >= 1 && cidr <= 32)
  );
}

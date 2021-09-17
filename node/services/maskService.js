exports.cidrToMask = (cidr) => {
  const mask = []
  for (let i = 0; i < 4; i++) {
    let bytes = Math.min(cidr, 8);
    mask.push(256 - Math.pow(2, 8 - bytes));
    cidr -= bytes;
  }
  return mask.join('.');
}

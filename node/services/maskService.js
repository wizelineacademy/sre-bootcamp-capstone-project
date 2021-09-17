exports.isValidMask = mask => {
  const validOctets = '(128|192|224|240|245|252|254|255)';
  const regex = new RegExp(
    `^((0|${validOctets})\.0\.0\.0|` +
    `255\.${validOctets}\.0\.0|` +
    `255\.255\.${validOctets}\.0|` +
    `255\.255\.255\.${validOctets})$`
  );
  return mask.match(regex);
}

exports.cidrToMask = (cidr) => {
  const mask = [];
  for (let i = 0; i < 4; i++) {
    let bytes = Math.min(cidr, 8);
    mask.push(256 - Math.pow(2, 8 - bytes));
    cidr -= bytes;
  }
  return mask.join('.');
}

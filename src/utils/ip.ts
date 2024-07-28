export function isValidIPv4(ip: string): boolean {
  return /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/.test(ip);
}

export function ipToUnsignedInteger(ip: string): number | null {
  const ipUnsigned = ip
    .split('.')
    .map((octet) => parseInt(octet))
    .reduce((a, b) => a * 256 + b);

  if (isNaN(ipUnsigned)) {
    return null;
  }

  return ipUnsigned;
}

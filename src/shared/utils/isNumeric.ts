export default function isNumeric(n: string): boolean {
  return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
}

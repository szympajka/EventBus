export function generateUEID(): string {
  let first = ((Math.random() * 46656) | 0).toString(36);
  let second = ((Math.random() * 46656) | 0).toString(36);
  first = first.padStart(3, '0');
  second = second.padStart(3, '0');

  return first + second;
}
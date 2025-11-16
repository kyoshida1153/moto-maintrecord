export function isDateYyyyMm(str: string): boolean {
  const regex = /^2[0-9][0-9][0-9]-(0[1-9]|1[0-2])$/;
  return regex.test(str);
}

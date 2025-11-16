export function isDateYyyy(str: string): boolean {
  const regex = /^2[0-9][0-9][0-9]$/;
  return regex.test(str);
}

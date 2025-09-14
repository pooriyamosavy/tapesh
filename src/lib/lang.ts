export function persianizeNumber(input: string | number): string {
  const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .toString()
    .split("")
    .map((ch) => (/\d/.test(ch) ? digits[+ch] : ch))
    .join("");
}

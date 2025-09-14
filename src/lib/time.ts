import { persianizeNumber } from "./lang";

export function toPersianDuration(sec: number): string {
  const minutes = Math.floor(sec / 60);
  const seconds = sec % 60;

  if (minutes && seconds)
    return `${persianizeNumber(minutes)} دقیقه و ${persianizeNumber(
      seconds
    )} ثانیه`;
  if (minutes) return `${persianizeNumber(minutes)} دقیقه`;
  return `${persianizeNumber(seconds)} ثانیه`;
}

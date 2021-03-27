const ALPHA = "A";
const NUMERIC = "9";
const ALPHANUMERIC = "?";
const REGEX_MAP = new Map([
  [ALPHA, /\w/],
  [NUMERIC, /\d/],
  [ALPHANUMERIC, /\w|\d/]
]);

export function mask(value: string, mask: string): string {
  value = value.toString();

  let len = value.length;
  let maskLen = mask.length;
  let pos = 0;
  let newValue = "";

  for (let i = 0; i < Math.min(len, maskLen); i++) {
    let maskChar = mask.charAt(i);
    let newChar = value.charAt(pos);
    let regex: RegExp = REGEX_MAP.get(maskChar);

    if (regex) {
      pos++;
      if (regex.test(newChar)) {
        newValue += newChar;
      } else {
        i--;
        len--;
      }
    } else {
      if (maskChar === newChar) {
        pos++;
      } else {
        len++;
      }
      newValue += maskChar;
    }
  }

  return newValue;
}

export function unmask(maskedValue: string, mask: string): string {
  let maskLen = (mask && mask.length) || 0;
  return maskedValue
    .split("")
    .filter((currChar, idx) => idx < maskLen && REGEX_MAP.has(mask[idx]))
    .join("");
}

export function validLength(mask: string): number {
  return mask
    .split("")
    .filter((str, i) => REGEX_MAP.has(mask[i]))
    .join("").length;
}

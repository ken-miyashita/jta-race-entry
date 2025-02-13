import { sanitizeZenkaku } from "./sanitize";

export function validateSailNumber(value: string) {
  const numString = sanitizeZenkaku(value);
  const invalidCharacter = checkValidCharacters(numString, "0-9");
  if (invalidCharacter) {
    return `"${invalidCharacter}" を含まないセール番号を数値で入力してください`;
  }
  if (numString.length > 4) {
    return "セール番号は4桁以下の数値で入力してください";
  }
  return true;
}

//
export function validatePositiveNumber(value: string | number) {
  if (typeof value === "number") {
    return true;
  }
  const numString = sanitizeZenkaku(value);
  const invalidCharacter = checkValidCharacters(numString, "0-9.");
  if (invalidCharacter) {
    return `"${invalidCharacter}" を含まない正の数値を入力してください`;
  }
  if (isNaN(Number(numString))) {
    return "正の数値を入力してください";
  }
  return true;
}

export function validateAlphabets(value: string) {
  const hankakuString = sanitizeZenkaku(value);
  const invalidCharacter = checkValidCharacters(hankakuString, "a-zA-Z,\\- ");
  if (invalidCharacter) {
    return `"${invalidCharacter}" を含まないアルファベットを入力してください"`;
  }
  return true;
}

export function validateEmail(value: string) {
  const hankakuString = sanitizeZenkaku(value);
  const invalidCharacter = checkValidCharacters(
    hankakuString,
    "0-9a-zA-Z@._\\-+"
  );
  if (invalidCharacter) {
    return `"${invalidCharacter}" を含まない正しいメールアドレスを入力してください`;
  }
  return true;
}

export function validatePhoneNumber(value: string) {
  const hankakuString = sanitizeZenkaku(value);
  const invalidCharacter = checkValidCharacters(hankakuString, "0-9()\\-+ ");
  if (invalidCharacter) {
    return `"${invalidCharacter}" を含まない正しい電話番号を入力してください`;
  }
  return true;
}

// YYYY-MM-DD の形式の日付文字列であるか確認する
export function validateDate(value: string) {
  if (value === "") {
    return true;
  }
  const hankakuString = sanitizeZenkaku(value);
  const invalidCharacter = checkValidCharacters(hankakuString, "0-9\\-");
  if (invalidCharacter) {
    return `"${invalidCharacter}" を含まない正しい日付を入力してください`;
  }
  const date = new Date(hankakuString);
  if (isNaN(date.getTime())) {
    return "正しい日付を入力してください";
  }
  return true;
}

// 正しい文字のみを含むか確認する
// @param value:　検査対象
// @param validCharacters: 正規表現で表した正しい文字集合  e.g. "0-9a-zA-Z"
// @returns 不正文字を含まないときは undefined、不正文字を含むときは最初の不正文字
function checkValidCharacters(
  value: string,
  validCharacters: string
): string | undefined {
  const regexp = new RegExp(`[^${validCharacters}]`);
  const result = regexp.exec(value);

  if (result && result?.length > 0) {
    return result[0]; // 最初の不正文字
  }
  {
    return undefined; // 正しい文字しか含まれていなかった
  }
}

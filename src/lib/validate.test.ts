import {
  validateSailNumber,
  validatePositiveNumber,
  validateAlphabets,
  validateEmail,
  validatePhoneNumber,
  validateDate,
} from "./validate";

describe("validateSailNumber", () => {
  it("空文字列は正しい", () => {
    expect(validateSailNumber("")).toBe(true);
  });
  it("セール番号 半角", () => {
    expect(validateSailNumber("123")).toBe(true);
  });
  it("セール番号 全角", () => {
    expect(validateSailNumber("７８９")).toBe(true);
  });
  it("セール番号 ５桁以上で不正", () => {
    expect(validateSailNumber("12345")).not.toBe(true);
  });
  it("セール番号 不正文字を含むので不正", () => {
    expect(validateSailNumber("0123a45")).not.toBe(true);
  });
});

describe("validatePositiveNumber", () => {
  it("空文字列は正しい", () => {
    expect(validatePositiveNumber("")).toBe(true);
  });
  it("正の整数", () => {
    expect(validatePositiveNumber("123")).toBe(true);
  });
  it("正の数（小数点あり）", () => {
    expect(validatePositiveNumber("123.45")).toBe(true);
  });
  it("正の整数（全角）", () => {
    expect(validatePositiveNumber("７８９")).toBe(true);
  });
  it("不正文字を含むので不正", () => {
    expect(validatePositiveNumber("0123a45")).not.toBe(true);
  });
  it("負の整数なので不正", () => {
    expect(validatePositiveNumber("-123")).not.toBe(true);
  });
  it("負の数（小数点あり）なので不正", () => {
    expect(validatePositiveNumber("-123.45")).not.toBe(true);
  });
  it("負の整数（全角）なので不正", () => {
    expect(validatePositiveNumber("ー７８９")).not.toBe(true);
  });
  it("数値は正しい", () => {
    expect(validatePositiveNumber(123)).toBe(true);
  });
});

describe("validateAlphabets", () => {
  it("空文字列は正しい", () => {
    expect(validateAlphabets("")).toBe(true);
  });
  it("正しいアルファベット", () => {
    expect(validateAlphabets("John Doe,-")).toBe(true);
  });
  it("不正文字を含むので不正", () => {
    expect(validateAlphabets("John Doe!")).not.toBe(true);
  });
});

describe("validateEmail", () => {
  it("空文字列は正しい", () => {
    expect(validateEmail("")).toBe(true);
  });
  it("正しいメールアドレス", () => {
    expect(validateEmail("john.doe@mail.com")).toBe(true);
  });
  it("不正文字を含むので不正", () => {
    expect(validateEmail("john.doe@mail,com")).not.toBe(true);
  });
});

describe("validatePhoneNumber", () => {
  it("空文字列は正しい", () => {
    expect(validatePhoneNumber("")).toBe(true);
  });
  it("正しい電話番号", () => {
    expect(validatePhoneNumber("+81-(123)-45-6789")).toBe(true);
  });
  it("不正文字を含むので不正", () => {
    expect(validatePhoneNumber("(0123)a45")).not.toBe(true);
  });
});

describe("validateDate", () => {
  it("空文字列は正しい", () => {
    expect(validateDate("")).toBe(true);
  });
  it("正しい日付", () => {
    expect(validateDate("2022-01-01")).toBe(true);
  });
  it("不正文字を含むので不正", () => {
    expect(validateDate("2022-01-01a")).not.toBe(true);
  });
  it("ありそうな不正文字を含むが不正", () => {
    expect(validateDate("2022/01/23")).not.toBe(true);
  });
});

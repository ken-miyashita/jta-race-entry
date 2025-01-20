import { checkValidCharacters } from "./validate";

describe("checkValidCharacters", () => {
  it("正の整数（不正文字なし）", () => {
    expect(checkValidCharacters("0123", "0-9")).toBe(undefined);
  });
  it("正の整数（不正文字あり）", () => {
    expect(checkValidCharacters("0123a45", "0-9")).toBe("a");
  });
  it("電話番号（不正文字なし）", () => {
    expect(checkValidCharacters("+81-123-45-6789", "0-9()\\-+ ")).toBe(
      undefined
    );
  });
  it("電話番号（不正文字あり）", () => {
    expect(checkValidCharacters("(0123)a45", "0-9()\\-+ ")).toBe("a");
  });
});

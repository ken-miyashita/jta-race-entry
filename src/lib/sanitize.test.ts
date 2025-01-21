import { sanitizeZenkaku, sanitizeDate, sanitizeNumber } from "./sanitize";
import dayjs from "dayjs";

describe("sanitizeZenkaku", () => {
  it("アルファベット", () => {
    expect(sanitizeZenkaku("ＡＢＺ")).toBe("ABZ");
    expect(sanitizeZenkaku("ａｂｚ")).toBe("abz");
  });
  it("数字", () => {
    expect(sanitizeZenkaku("０１９")).toBe("019");
  });
  it("記号", () => {
    expect(sanitizeZenkaku("＠＃＄ー")).toBe("@#$-");
  });
  it("全角文字をそのまま維持", () => {
    expect(sanitizeZenkaku("あいうえお")).toBe("あいうえお");
    expect(sanitizeZenkaku("アイウエオ")).toBe("アイウエオ");
    expect(sanitizeZenkaku("漢字")).toBe("漢字");
  });
});

describe("sanitizeDate", () => {
  it("undefined", () => {
    expect(sanitizeDate(undefined)).toBe("");
  });
  it("null", () => {
    expect(sanitizeDate(null)).toBe("");
  });
  it("空文字列", () => {
    expect(sanitizeDate("")).toBe("");
  });
  it("string", () => {
    expect(sanitizeDate("2022-01-01")).toBe("2022-01-01");
  });
  it("Dayjs", () => {
    expect(sanitizeDate(dayjs("2022-01-01"))).toBe("2022-01-01");
  });
});

describe("sanitizeNumber", () => {
  it("全角数字", () => {
    expect(sanitizeNumber("０１９")).toBe(19);
  });
  it("半角数字", () => {
    expect(sanitizeNumber("019")).toBe(19);
  });
  it("全角数字と半角数字が混在", () => {
    expect(sanitizeNumber("０１9")).toBe(19);
  });
  it("数値以外の文字が後ろに含まれる", () => {
    expect(sanitizeNumber("１９a")).toBe(19);
  });
  it("数値以外の文字が前に含まれる", () => {
    expect(sanitizeNumber("a１９")).toBe(0);
  });
  it("空文字列", () => {
    expect(sanitizeNumber("")).toBe(0);
  });
});

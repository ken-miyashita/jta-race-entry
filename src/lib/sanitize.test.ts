import { sanitizeZenkaku } from "./sanitize";

describe("sanitizeZenkaku", () => {
  it("converts full-width characters to half-width characters", () => {
    expect(sanitizeZenkaku("ＡＢ")).toBe("AB");
    expect(sanitizeZenkaku("ａｂ")).toBe("ab");
    expect(sanitizeZenkaku("０１")).toBe("01");
  });
});

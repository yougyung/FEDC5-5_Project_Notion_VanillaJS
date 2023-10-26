import { hasSigleRoot } from "@/core/component";

describe("hasSigleRoot", () => {
  test("should return true for single root element", () => {
    const input = "<div>hello</div>";
    expect(hasSigleRoot(input)).toBe(true);
  });

  test("should return false for multiple root elements", () => {
    const input = "<div>hello</div><div>world</div>";
    expect(hasSigleRoot(input)).toBe(false);
  });

  test("should return true for single root with internal elements", () => {
    const input = "<div><span>hello</span><span>world</span></div>";
    expect(hasSigleRoot(input)).toBe(true);
  });

  test("should return false for only whitespace", () => {
    const input = "   ";
    expect(hasSigleRoot(input)).toBe(false);
  });

  test("should return false for non-matching closing tag ", () => {
    const input = "<div><br></div><div><br></div></h1>";
    expect(hasSigleRoot(input)).toBe(false);
  });
});

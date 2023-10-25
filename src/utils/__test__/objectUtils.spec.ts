import { isObject } from "@/utils/objectUtils";

describe("isObject", () => {
  it("should return false for primitive types", () => {
    expect(isObject(undefined)).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(Symbol())).toBe(false);
  });

  it("should return true for objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
    expect(isObject({ key: { nestedKey: "nestedValue" } })).toBe(true);
    expect(isObject(new Date())).toBe(true);
    expect(isObject(/regex/)).toBe(true);
    expect(isObject(new Set())).toBe(true);
    expect(isObject(new Map())).toBe(true);
  });

  it("should return true for arrays", () => {
    expect(isObject([])).toBe(true);
    expect(isObject([1, 2, 3])).toBe(true);
    expect(isObject([{ key: "value" }])).toBe(true);
  });

  it("should return true for functions", () => {
    expect(isObject(() => {})).toBe(true);
    expect(isObject(function () {})).toBe(true);
  });
});

import { describe, it, expect } from "vitest";

import { cn } from "./cn";

describe("cn utility", () => {
  it("should merge multiple class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    expect(cn("class1", true && "class2", false && "class3")).toBe("class1 class2");
  });

  it("should handle null, undefined, and boolean values", () => {
    expect(cn("class1", null, undefined, true, false)).toBe("class1");
  });

  it("should handle arrays of classes", () => {
    expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
  });

  it("should handle objects of classes", () => {
    expect(cn({ "class1": true, "class2": false }, "class3")).toBe("class1 class3");
  });

  it("should correctly merge tailwind classes using tailwind-merge", () => {
    // Basic override
    expect(cn("px-2 py-2", "px-4")).toBe("py-2 px-4");
    
    // Conflict override
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    
    // Complex merge
    expect(cn("p-4 text-sm font-bold", "p-8 text-lg")).toBe("font-bold p-8 text-lg");
  });
});

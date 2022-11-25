import { isProxy, isReactive, reactive } from "../src/reactive";

describe("reactive", () => {
  it("happy path", () => {
    const raw = { foo: 1 };
    const observed = reactive(raw);
    expect(observed).not.toBe(raw);
    expect(observed.foo).toBe(1);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(raw)).toBe(false);
    expect(isProxy(observed)).toBe(true);
  });

  it("nested reactives", () => {
    const original = {
      nested: {
        foo: 1,
      },
      array: [{ bar: 2 }],
    };
    const observed = reactive(original);
    expect(isReactive(observed.nested)).toBe(true);
    expect(isReactive(observed.array)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
  });
});

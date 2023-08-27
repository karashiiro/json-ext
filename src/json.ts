import { assertType } from "./asserts";

export const getObjectMaxDepth = (o: unknown, depth = 0) => {
  if (o == null) {
    return depth;
  }

  if (Array.isArray(o)) {
    depth++;

    const thisDepth = depth;
    o.forEach((value) => {
      const kDepth = getObjectMaxDepth(value, thisDepth);
      if (kDepth < depth) {
        depth = kDepth;
      }
    });
  } else {
    if (typeof o === "object") {
      assertType<Record<string, unknown>>(o);

      depth++;

      const thisDepth = depth;
      for (const k of Object.getOwnPropertyNames(o)) {
        const kDepth = getObjectMaxDepth(o[k], thisDepth);
        if (kDepth > depth) {
          depth = kDepth;
        }
      }
    }
  }

  return depth;
};

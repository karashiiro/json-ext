import { assertType } from "./asserts";
import * as jp from "jsonpath";

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
  } else if (typeof o === "object") {
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

  return depth;
};

export const getJSONFileNameFromPath = (path: string) => {
  const lastPathSegment = path.substring(path.lastIndexOf("/") + 1);

  if (lastPathSegment.endsWith(".json")) {
    return lastPathSegment;
  }

  return `${lastPathSegment}.json`;
};

export const jsonPathToQuery = (path: jp.PathComponent[]): string => {
  const result: string[] = [path[0] as string]; // Always $

  for (const component of path.slice(1)) {
    if (typeof component === "string") {
      result.push(".", component);
    } else if (typeof component === "number") {
      result.push("[", `${component}`, "]");
    }
  }

  return result.join("");
};

const discardLastElementsIfIndices = (
  path: jp.PathComponent[],
  elements: number[] = [],
): [jp.PathComponent[], number[]] => {
  const last = path[path.length - 1];
  if (typeof last === "number") {
    elements.unshift(last);
    return discardLastElementsIfIndices(path.slice(0, -1), elements);
  }

  return [path, elements];
};

const compareIndexArrays = (a: number[], b: number[]): number => {
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] !== b[i]) {
      return a[i] - b[i];
    }
  }

  // Shorter array comes first
  return a.length - b.length;
};

export const compareJSONPaths = (collator: Intl.Collator) => {
  return (a: jp.PathComponent[], b: jp.PathComponent[]) => {
    // Extract array indices from paths
    const [aClean, aLastIndices] = discardLastElementsIfIndices(a);
    const [bClean, bLastIndices] = discardLastElementsIfIndices(b);

    // Compare the arrays with a string comparison, discarding array indices
    const strResult = collator.compare(aClean.join("."), bClean.join("."));
    if (strResult !== 0) {
      return strResult;
    }

    return compareIndexArrays(aLastIndices, bLastIndices);
  };
};

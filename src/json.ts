import * as jp from "jsonpath";

export const jsonPathToRowId = (path: jp.PathComponent[]): string => {
  return ["", ...path.slice(1)].join("/");
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

export const compareJSONPaths = (collator: Intl.Collator) => {
  return (a: jp.PathComponent[], b: jp.PathComponent[]) => {
    return collator.compare(a.join("."), b.join("."));
  };
};

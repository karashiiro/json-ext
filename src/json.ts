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

const ascendPath = (path: jp.PathComponent[]): jp.PathComponent[][] => {
  if (path.length === 1) {
    return [path];
  }

  return [path, ...ascendPath(path.slice(0, -1))];
};

export const searchJSONPaths = (
  value: unknown,
  search: string,
): jp.PathComponent[][] => {
  return jp
    .paths(value, "$..*")
    .filter((path) => {
      const key = `${path[path.length - 1]}`.toLocaleLowerCase();
      const val = jp.query(value, jsonPathToQuery(path))[0];
      return (
        key.includes(search) ||
        (typeof val === "string" && val.includes(search))
      );
    })
    .flatMap(ascendPath);
};

export const getSortedJSONPaths = (value: unknown): jp.PathComponent[][] => {
  if (value == null || typeof value !== "object") {
    return [];
  }

  return jp
    .paths(value, "$.*") // Get the first level of paths
    .flatMap((path) => [
      path, // Map to an array of [path, ...child paths]
      ...getSortedJSONPaths(jp.query(value, jsonPathToQuery(path))[0]).map(
        (p) => [...path, ...p.slice(1)], // Combine paths with their parents
      ),
    ]);
};

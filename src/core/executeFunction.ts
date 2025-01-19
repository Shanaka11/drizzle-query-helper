import {
  and,
  AnyTable,
  between,
  eq,
  gt,
  gte,
  ilike,
  like,
  lt,
  ne,
  notLike,
  or,
  SQL,
} from "drizzle-orm";

export const executefunction = (
  table: AnyTable<any>,
  functionName: string,
  args: any[],
): SQL | undefined => {
  if (!Array.isArray(args)) {
    throw new Error("args must be an array");
  }

  if (functionName === "and") {
    //@ts-ignore
    return and(...args);
  }
  if (functionName === "or") {
    //@ts-ignore
    return or(...args);
  }
  if (functionName === "eq") {
    //@ts-ignore
    return eq(table[args[0]], args[1]);
  }
  if (functionName === "neq") {
    //@ts-ignore
    return ne(table[args[0]], args[1]);
  }
  if (functionName === "gt") {
    //@ts-ignore
    return gt(table[args[0]], args[1]);
  }
  if (functionName === "lt") {
    //@ts-ignore
    return lt(table[args[0]], args[1]);
  }
  if (functionName === "gte") {
    //@ts-ignore
    return gte(table[args[0]], args[1]);
  }
  if (functionName === "lte") {
    //@ts-ignore
    return lte(table[args[0]], args[1]);
  }
  if (functionName === "like") {
    //@ts-ignore
    return like(table[args[0]], args[1]);
  }
  if (functionName === "ilike") {
    //@ts-ignore
    return ilike(table[args[0]], args[1]);
  }
  if (functionName === "nlike") {
    //@ts-ignore
    return notLike(table[args[0]], args[1]);
  }

  if (functionName === "between") {
    //@ts-ignore
    return between(table[args[0]], args[1], args[2]);
  }
  throw new Error(`Unknown function ${functionName}`);
};

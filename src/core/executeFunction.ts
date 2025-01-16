import { and, AnyTable, eq, or, SQL } from "drizzle-orm";

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
  throw new Error(`Unknown function ${functionName}`);
};

//@ts-nocheck
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
  lte,
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
    // For date
    if (table[args[0]].dataType === "date") {
      return eq(table[args[0]], new Date(args[1]));
    }
    // For booleans
    if (table[args[0]].dataType === "boolean") {
      return eq(table[args[0]], args[1] === "true" ? true : false);
    }
    // For numbers
    if (table[args[0]].dataType === "number") {
      return eq(table[args[0]], Number(args[1]));
    }
    //@ts-ignore
    return eq(table[args[0]], args[1]);
  }
  if (functionName === "neq") {
    // For date
    if (table[args[0]].dataType === "date") {
      return ne(table[args[0]], new Date(args[1]));
    }
    // For booleans
    if (table[args[0]].dataType === "boolean") {
      return ne(table[args[0]], args[1] === "true" ? true : false);
    }
    // For numbers
    if (table[args[0]].dataType === "number") {
      return ne(table[args[0]], Number(args[1]));
    }
    //@ts-ignore
    return ne(table[args[0]], args[1]);
  }
  // TODO: Handle string and number comparison, for now we consider all less than and greater than as number
  if (functionName === "gt") {
    // For date
    if (table[args[0]].dataType === "date") {
      return gt(table[args[0]], new Date(args[1]));
    }
    //@ts-ignore
    // For numbers
    if (table[args[0]].dataType === "number") {
      return gt(table[args[0]], Number(args[1]));
    }
    return gt(table[args[0]], args[1]);
  }
  if (functionName === "lt") {
    // For date
    if (table[args[0]].dataType === "date") {
      return lt(table[args[0]], new Date(args[1]));
    }
    //@ts-ignore
    // For numbers
    if (table[args[0]].dataType === "number") {
      return lt(table[args[0]], Number(args[1]));
    }
    return lt(table[args[0]], args[1]);
  }
  if (functionName === "gte") {
    // For date
    if (table[args[0]].dataType === "date") {
      return gte(table[args[0]], new Date(args[1]));
    }
    //@ts-ignore
    // For numbers
    if (table[args[0]].dataType === "number") {
      return gte(table[args[0]], Number(args[1]));
    }
    return gte(table[args[0]], args[1]);
  }
  if (functionName === "lte") {
    // For date
    if (table[args[0]].dataType === "date") {
      return lte(table[args[0]], new Date(args[1]));
    }
    //@ts-ignore
    // For numbers
    if (table[args[0]].dataType === "number") {
      return lte(table[args[0]], Number(args[1]));
    }
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
    // For date
    if (table[args[0]].dataType === "date") {
      return between(table[args[0]], new Date(args[1]), new Date(args[2]));
    }
    //@ts-ignore
    // For numbers
    if (table[args[0]].dataType === "number") {
      return between(table[args[0]], Number(args[1]), Number(args[2]));
    }
    return between(table[args[0]], args[1], args[2]);
  }
  throw new Error(`Unknown function ${functionName}`);
};

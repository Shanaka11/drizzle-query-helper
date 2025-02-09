import {
  and,
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
} from "drizzle-orm";
import { expect, test } from "vitest";

import { generateDrizzleFilter, generateDrizzleFilterPg } from "../src";
import { users, usersPg } from "./mockTable";

test("Check Equal", async () => {
  const filterString = "eq(firstName,jhone)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(eq(users.firstName, "jhone"));
});

test("Check Not Equal", async () => {
  const filterString = "neq(firstName,jhone)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(ne(users.firstName, "jhone"));
});

test("Check Less Than", async () => {
  const filterString = "lt(id,12)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(lt(users.id, 12));
});

test("Check Less Than Or Equal", async () => {
  const filterString = "lte(id,12)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(lte(users.id, 12));
});

test("Check Greater Than", async () => {
  const filterString = "gt(id,12)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(gt(users.id, 12));
});

test("Check Greater Than Or Equal", async () => {
  const filterString = "gte(id,12)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(gte(users.id, 12));
});

test("Check Like", async () => {
  const filterString = "like(firstName,%ohn)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(like(users.firstName, "%ohn"));
});

test("Check Like", async () => {
  const filterString = "ilike(firstName,%ohn)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(ilike(users.firstName, "%ohn"));
});

test("Check Not Like", async () => {
  const filterString = "nlike(firstName,%ohn)";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(notLike(users.firstName, "%ohn"));
});

test("Check AND", async () => {
  const filterString = "and(eq(firstName,jhone),eq(lastName,doe))";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(
    and(eq(users.firstName, "jhone"), eq(users.lastName, "doe")),
  );
});

test("Check OR", async () => {
  const filterString = "or(eq(firstName,jhone),eq(lastName,doe))";
  const drizzleFilter = generateDrizzleFilter(users, filterString);
  expect(drizzleFilter).toStrictEqual(
    or(eq(users.firstName, "jhone"), eq(users.lastName, "doe")),
  );
});

test("Check PG", async () => {
  const filterString = "eq(icon,jhone)";
  const drizzleFilter = generateDrizzleFilterPg(usersPg, filterString);
  expect(drizzleFilter).toStrictEqual(eq(usersPg.icon, "jhone"));

  const newDate = new Date();
  //newDate.toUTCString()
  // Try to url encode the date utc string
  // Wed, 14 Jun 2017 07:00:00 GMT == Wed%2C%2014%20Jun%202017%2007%3A00%3A00%20GMT
  const filterString3 = `eq(dob,${newDate.toISOString()})`;
  const drizzleFilter3 = generateDrizzleFilter(usersPg, filterString3);
  expect(drizzleFilter3).toStrictEqual(eq(usersPg.dob, newDate));
});

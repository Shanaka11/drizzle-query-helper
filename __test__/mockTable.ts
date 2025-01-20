import { AnySQLiteColumn, sqliteTable } from "drizzle-orm/sqlite-core";
import * as t from "drizzle-orm/sqlite-core";

export const users = sqliteTable(
  "users",
  {
    id: t.int().primaryKey({ autoIncrement: true }),
    firstName: t.text("first_name"),
    lastName: t.text("last_name"),
    email: t.text().notNull(),
    invitee: t.int().references((): AnySQLiteColumn => users.id),
    role: t.text().$type<"guest" | "user" | "admin">().default("guest"),
    dateOfBirth: t.text(`timestamp`),
  },
  (table) => {
    return [t.uniqueIndex("email_idx").on(table.email)];
  },
);

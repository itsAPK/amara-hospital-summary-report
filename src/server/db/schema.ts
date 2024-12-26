import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTable,
  sqliteTableCreator,
  
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */




export const doctors = sqliteTable(
  "doctor",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name", { length: 255 }).notNull(),
    mobile: text("mobile", { length: 255 ,}),  
  }
);


export const departments = sqliteTable(
  "department",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name", { length: 255 }).notNull(),
    onDutyDoctor: text("onDutyDoctor").references(() => doctors.id),
    unavailableDoctor: text("unavailableDoctor").references(() => doctors.id),
  }
);

export const emergency = sqliteTable(
  "emergency",
  {
    id: text("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    doctor: text("doctor").references(() => doctors.id),
    status: text("status", { length: 255 }).notNull(),
    designation: text("designation", { length: 255 }).notNull(),
  }
)

export const onDutyDoctor = relations(departments, ({ one }) => ({
  onDutyDoctor: one(doctors, {
    fields: [departments.onDutyDoctor],
    references: [doctors.id],
  }),
}));

export const unavailableDoctor = relations(departments, ({ one }) => ({
  unavailableDoctor: one(doctors, {
    fields: [departments.unavailableDoctor],
    references: [doctors.id],
  }),
}));




export const doctor = relations(emergency, ({ one }) => ({
  doctor: one(doctors, {
    fields: [emergency.doctor],
    references: [doctors.id],
  }),
}));
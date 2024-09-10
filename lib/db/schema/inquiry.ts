import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  pgEnum,
  jsonb,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const statusEnum = pgEnum("status", ["pending", "cancelled", "active"]);

export const serviceEnum = pgEnum("service", [
  "software_development",
  "devops",
  "qa",
  "ui_ux",
  "consulting",
  "support",
]);

// Inquiry table schema
export const inquiry = pgTable("inquiry", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 15 }).notNull(),
  budget: varchar("budget").notNull(),
  status: statusEnum("status").notNull().default("pending"),
  source: varchar("source", { length: 256 }),
  serviceRequested: serviceEnum("service_requested").notNull(),
  aboutProject: varchar("about_project", { length: 1024 }),
  additionalInfo: jsonb("additional_info"), 
  createdAt: timestamp("created_at").notNull().defaultNow(),
});


export const insertInquirySchema = createInsertSchema(inquiry).extend({});

export type NewInquiryParams = z.infer<typeof insertInquirySchema>;

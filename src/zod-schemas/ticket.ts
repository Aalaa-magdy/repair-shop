import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { tickets } from "@/db/schema";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("New")]),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  tech: z.string().email("Invalid email address"),
});

export const selectTicketSchema = createSelectSchema(tickets);

// ✅ Types
export type InsertTicketSchemaType = z.infer<typeof insertTicketSchema>;
export type SelectTicketSchemaType = z.infer<typeof selectTicketSchema>;

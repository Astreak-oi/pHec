import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// import { env } from "@/lib/env.mjs";

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
export const db = drizzle(client);
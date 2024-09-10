import { db } from "../db";
import {
  inquiry,
  insertInquirySchema,
  NewInquiryParams,
} from "../db/schema/inquiry";

export const createInquiry = async (input: NewInquiryParams) => {
  try {
    const payload = {
      ...input,
      createdAt: new Date(),
    };

    const validatedPayload = insertInquirySchema.parse(payload);

    const [inquire] = await db
      .insert(inquiry)
      .values(validatedPayload)
      .returning();

    return "Form successfully created";
  } catch (e) {
    console.error("Error inserting inquiry:", e); // Log the error
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};

export const getInquiries = async () => {
  try {
    const inquiries = await db.select().from(inquiry).execute();
    if (inquiries.length === 0) return "No inquiries found";
    // return inquiries;   after adding securtiy, we will return only the inquiries that the user is allowed to see
    return "Inquiries found";
  } catch (e) {
    console.error("Error getting inquiries:", e); // Log the error
    if (e instanceof Error)
      return e.message.length > 0 ? e.message : "Error, please try again.";
  }
};

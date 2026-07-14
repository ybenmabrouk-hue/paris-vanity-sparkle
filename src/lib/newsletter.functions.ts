import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Please enter a valid email address" }).max(255),
});

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .inputValidator((data) => emailSchema.parse(data))
  .handler(async ({ data }) => {
    // Server-side validation succeeded. In production, wire this to your
    // email provider (e.g., Mailchimp, Klaviyo, Resend) or store in a database.
    return { success: true, email: data.email };
  });

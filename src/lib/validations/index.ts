import z from "zod";

export const SearchValidateSchema = z.object({
  query: z.string().min(3, { message: "Minimum 3 characters required" }),
});

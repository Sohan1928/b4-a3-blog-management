import { z } from "zod";

const userValidationSchema = z.object({
  name: z
    .string({ invalid_type_error: "name must be string" })
    .nonempty("name can not be empty"),
  email: z
    .string({
      required_error: "email must be required",
    })
    .email("provide email must be a valid email address"),
  password: z
    .string({
      required_error: "Password must required",
    })
    .min(6, "Password must al least 6 characters"),
  role: z.enum(["user", "admin"]).optional().default("user"),
  isBlocked: z.boolean().optional().default(false),
});

export const UserValidations = {
  userValidationSchema,
};

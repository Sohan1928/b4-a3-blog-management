import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "User must be string",
    }),
  }),
});

const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "User must be string",
    }),
  }),
});

export const UserValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
};

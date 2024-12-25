import { z } from "zod";

export const registerUserValidationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .nonempty("Name can not be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Provide Email must be a valid email address"),
  password: z.string({
    required_error: "Password is required",
  }),
});

export const loginUserValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required!" })
      .email("Invalid email"),
    password: z.string({ required_error: "Password is required!" }),
  }),
});

export type RegisterUserValidationType = z.infer<
  typeof registerUserValidationSchema
>;
export type loginUserValidationType = z.infer<typeof loginUserValidationSchema>;

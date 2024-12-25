import { z } from "zod";

const createBlogValidationSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .nonempty("Title can not be empty"),
  content: z
    .string({ required_error: "Content is required" })
    .nonempty("Content can not be empty"),
  author: z.string().optional(),
  isPublished: z.boolean().optional().default(true),
});

const updateBlogValidationSchema = z.object({
  title: z.string().nonempty("Title can not be empty").optional(),
  content: z.string().nonempty("Content can not be empty").optional(),
  author: z.string().optional(),
  isPublished: z.boolean().optional().default(true),
});

export type createBlogValidationType = z.infer<
  typeof createBlogValidationSchema
>;
export type updateBlogValidationType = z.infer<
  typeof updateBlogValidationSchema
>;

export const blogValidationSchema = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};

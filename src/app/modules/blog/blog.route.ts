import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constants";
import validateRequest from "../../middlewares/validateRequest";
import { blogValidationSchema } from "./blog.validation";
import { BlogControllers } from "./blog.controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema.createBlogValidationSchema),
  BlogControllers.createBlog
);

router.patch(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(blogValidationSchema.updateBlogValidationSchema),
  BlogControllers.updateBlog
);

router.delete("/:", auth(USER_ROLE.user), BlogControllers.deleteBlog);

router.get("/", BlogControllers.getAllBlogs);

export const BlogRoutes = router;

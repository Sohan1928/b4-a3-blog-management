import { StatusCodes } from "http-status-codes";
import AppError from "../../error/AppError";
import { User } from "../user/user.model";
import { Blog } from "../blog/blog.model";

const blockTheUser = async (userId: string) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }
  const result = await User.findByIdAndUpdate(userId, { isBlocked: true });
  return result;
};

const deleteBlogByAdmin = async (blogId: string) => {
  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found!");
  }
  const result = await Blog.findByIdAndDelete(blogId);
  return result;
};

export const adminServices = {
  blockTheUser,
  deleteBlogByAdmin,
};

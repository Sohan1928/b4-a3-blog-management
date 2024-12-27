import { Request } from "express";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { Types } from "mongoose";
import { User } from "../user/user.model";
import AppError from "../../error/AppError";
import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";

const createBlog = async (req: Request, blog: IBlog) => {
  const { user } = req;

  // check if the user exists
  const userExists = await User.isUserExistsByEmail(user.email);
  if (!userExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }
  const id = userExists._id as Types.ObjectId;

  blog.author = id;
  const result = await Blog.create(blog);
  const populateBlog = await Blog.findById(result._id).populate("author");
  return {
    _id: populateBlog?._id,
    title: populateBlog?.title,
    content: populateBlog?.content,
    author: populateBlog?.author,
  };
};

const updateBlog = async (req: Request, id: string, blog: Partial<IBlog>) => {
  const { email } = req.user;

  // checking if the blog is exist!
  const blogExists = await Blog.findById(id).populate("author");
  if (!blogExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found!");
  }
  const authorEmail = (blogExists?.author as any)?.email;
  if (authorEmail !== email) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to update blog!"
    );
  }
  if (!Object.keys(blog).length) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Please provide update data!");
  }
  const result = await Blog.findByIdAndUpdate(id, blog, { new: true }).populate(
    "author"
  );
  return {
    _id: result?._id,
    title: result?.title,
    content: result?.content,
    author: result?.author,
  };
};

const deleteBlog = async (req: Request, id: string) => {
  const { email } = req.user;

  // checking if the blog is exist!
  const blogExists = await Blog.findById(id).populate("author");
  if (!blogExists) {
    throw new AppError(StatusCodes.NOT_FOUND, "Blog not found!");
  }
  const authorEmail = (blogExists?.author as any)?.email;
  if (authorEmail !== email) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "You are not authorized to delete this blog!"
    );
  }
  const result = await Blog.findByIdAndDelete(id);
  return result;
};

const getAllBlogs = async (query: Record<string, unknown>) => {
  const blogsQuery = new QueryBuilder(Blog.find().populate("author"), query)
    .search(["title", "content"])
    .filter()
    .sort();

  const blogs = await blogsQuery.modelQuery;
  return blogs;
};

export const BlogServices = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlogs,
};

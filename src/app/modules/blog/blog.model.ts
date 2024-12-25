import { model, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

const blogSchema = new Schema<IBlog>(
  {
    title: { type: String, required: [true, "Title is required!"] },
    content: { type: String, required: [true, "Content is required!"] },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    isPublished: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// transform exclude
blogSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.__v;
    delete ret.isPublished;
    delete ret.createdAt;
    delete ret.updatedAt;
    return ret;
  },
});

export const blog = model<IBlog>("blog", blogSchema);

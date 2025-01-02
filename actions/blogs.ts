"use server";
import * as z from "zod";
import prisma from "@/lib/prisma";

import { BlogSchema } from "@/zod-schema";

type BlogData = z.infer<typeof BlogSchema>;

class BlogService {
  async getBlogs() {
    try {
      const blogs = await prisma.blogs.findMany();
      if (!blogs) {
        return { success: false, message: "No blogs found" };
      }
      return {
        success: true,
        message: "Blogs retrieved successfully",
        data: blogs,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: `Error retrieving blogs: ${error.message}` };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  }

  async getBlogById(id: string) {
    try {
      const blog = await prisma.blogs.findUnique({
        where: {
          id,
        },
      });
      if (blog) {
        return {
          success: true,
          message: "Blog retrieved successfully",
          data: blog,
        };
      } else {
        return { success: false, message: "Blog not found" };
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: `Error retrieving blog: ${error.message}` };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  }

  async createBlog(data: BlogData) {
    try {
      const parsedData = BlogSchema.safeParse(data);
      if (!parsedData.success) {
        return {
          success: false,
          message: `Error creating blog: ${parsedData.error.message}`,
        };
      }

      const blog = await prisma.blogs.create({
        data,
      });
      return { success: true, message: "Blog created successfully", data: blog };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: `Error creating blog: ${error.message}` };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  }

  async updateBlog(data: BlogData) {
    try {
      const parsedData = BlogSchema.safeParse(data);
      if (!parsedData.success) {
        return {
          success: false,
          message: `Error updating blog: ${parsedData.error.message}`,
        };
      }
      const blog = await prisma.blogs.update({
        where: {
          id: data.id,
        },
        data,
      });
      return { success: true, message: "Blog updated successfully", data: blog };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: `Error updating blog: ${error.message}` };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  }

  async deleteBlog(id: string) {
    try {
      const blog = await prisma.blogs.delete({
        where: {
          id,
        },
      });
      return { success: true, message: "Blog deleted successfully", data: blog };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: `Error deleting blog: ${error.message}` };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  }

  async getBlogsByUser(email?: string, userId?: string) {
    try {
      const blogs = await prisma.blogs.findMany({
        where: {
          OR: [{ Users: { email } }, { Users: { id: userId } }],
        },
      });
      if (!blogs) {
        return { success: false, message: "No blogs found" };
      }
      return {
        success: true,
        message: "Blogs retrieved successfully",
        data: blogs,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return { success: false, message: `Error retrieving blogs: ${error.message}` };
      }
      return { success: false, message: "Unknown error occurred" };
    }
  }
}

export { BlogService };
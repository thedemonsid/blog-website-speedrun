// app/blogs/page.tsx
import { BlogService } from "@/actions/blogs";
import BlogsList from "@/components/blog-list";

const blogService = new BlogService();

export default async function BlogsPage() {
  const blogsResponse = await blogService.getBlogs();
  const blogs = blogsResponse.success ? blogsResponse.data : [];

  return <BlogsList blogs={blogs} />;
}

// app/blogs/[blogId]/page.tsx
import { notFound } from "next/navigation";
import { BlogService } from "@/actions/blogs";
import BlogPost from "@/components/blog-post";

const blogService = new BlogService();

export default async function BlogPage({
  params: { blogId },
}: {
  params: { blogId: string };
}) {
  const response = await blogService.getBlogById(blogId);

  if (!response.success) {
    notFound();
  }

  return <BlogPost blog={response.data} />;
}

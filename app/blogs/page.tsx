// app/blogs/page.tsx
import BlogsList from "@/components/blog-list";
import { getBlogPosts } from "./utils";

export default function BlogsPage() {
  const blogs = getBlogPosts();

  return <BlogsList blogs={blogs ?? []} />;
}

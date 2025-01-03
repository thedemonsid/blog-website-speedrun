import { BlogService } from "@/actions/blogs";
import HomePage from "@/components/home-page";

const blogService = new BlogService();

export default async function Page() {
  const blogsResponse = await blogService.getBlogs();
  const blogs = blogsResponse.success ? blogsResponse.data ?? [] : [];

  return <HomePage initialBlogs={blogs} />;
}
